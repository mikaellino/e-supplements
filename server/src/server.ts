import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Banco
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'e_supplements_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- MIDDLEWARE DE SEGURANÇA ---
const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) return res.status(401).json({ error: 'Acesso negado' });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.user = user;
        next();
    });
};

// Verifica se usuário é admin
const isAdmin = (req: any, res: any, next: any) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acesso negado: Apenas administradores.' });
    }
    next();
};

const JWT_SECRET = 'sua_chave_super_secreta_123';

// 1. REGISTRO DE USUÁRIO
app.post('/api/register', async (req, res): Promise<any> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    try {
        // Verifica se usuário já existe
        const [existingUsers]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Criptografa a senha (Hash)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Salva no banco
        await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            [name, email, passwordHash]
        );

        res.status(201).json({ message: 'Usuário criado com sucesso!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res): Promise<any> => {
    const { email, password } = req.body;

    try {
        // Busca o usuário pelo email
        const [users]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ error: 'Usuário ou senha inválidos' });
        }

        const user = users[0];

        // Compara a senha enviada com o Hash do banco
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: 'Usuário ou senha inválidos' });
        }

        // Gera o Token JWT (O Crachá)
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        // Retorna dados (menos a senha!)
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// --- ROTAS DE PRODUTOS ---

app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// 3. FINALIZAR PEDIDO (CHECKOUT)
app.post('/api/checkout', async (req, res): Promise<any> => {
    const { userId, items } = req.body;

    // Validação básica
    if (!userId || !items || items.length === 0) {
        return res.status(400).json({ error: 'Carrinho vazio ou usuário não identificado.' });
    }

    // Pegamos uma conexão dedicada para poder usar TRANSAÇÃO
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const totalAmount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

        // 2. Criar o Pedido na tabela 'orders'
        const [orderResult]: any = await connection.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
            [userId, totalAmount, 'paid']
        );
        
        const orderId = orderResult.insertId;

        // 3. Inserir os itens e baixar estoque
        for (const item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
                [orderId, item.id, item.quantity, item.price]
            );

            // Baixa o estoque na tabela products
            await connection.query(
                'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
                [item.quantity, item.id]
            );
        }

        await connection.commit();
        
        console.log(`✅ Pedido #${orderId} criado com sucesso!`);
        res.json({ message: 'Compra realizada com sucesso!', orderId });

    } catch (error) {
        await connection.rollback();
        console.error("Erro no checkout:", error);
        res.status(500).json({ error: 'Erro ao processar a compra.' });
    } finally {
        connection.release();
    }
});

app.get('/api/my-orders', authenticateToken, async (req: any, res: any): Promise<any> => {
    const userId = req.user.id;

    try {
        const query = `
            SELECT 
                o.id, 
                o.total_amount, 
                o.status, 
                o.created_at,
                GROUP_CONCAT(CONCAT(p.name, ' (', oi.quantity, ')') SEPARATOR ', ') as items_summary
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `;

        const [rows] = await pool.query(query, [userId]);
        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
});

// 5. ADICIONAR PRODUTO (Protegido: Token + Admin)
app.post('/api/products', authenticateToken, isAdmin, async (req: any, res: any): Promise<any> => {
    const { category_id, name, description, price, stock_quantity, image_url } = req.body;

    try {
        const [result]: any = await pool.query(
            'INSERT INTO products (category_id, name, description, price, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [category_id, name, description, price, stock_quantity, image_url]
        );
        res.status(201).json({ message: 'Produto criado!', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
});

// 6. REMOVER PRODUTO (Protegido: Token + Admin)
app.delete('/api/products/:id', authenticateToken, isAdmin, async (req: any, res: any): Promise<any> => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM products WHERE id = ?', [id]);
        
        res.json({ message: 'Produto removido com sucesso!' });
    } catch (error: any) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') { 
            return res.status(400).json({ error: 'Não é possível apagar este produto pois ele já possui vendas.' });
        }
        console.error(error);
        res.status(500).json({ error: 'Erro ao remover produto' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});