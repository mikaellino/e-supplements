import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Whey: React.FC = () => {
  // Estado para armazenar os produtos que virão do Backend
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        const wheyOnly = data.filter((item: any) => item.category_id === 1);

        // 3. Transforma os dados do Banco para o formato do React
        const formattedProducts = wheyOnly.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price),
          image: item.image_url,
          quantity: item.stock_quantity
        }));

        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-10 font-bold text-orange-900">Carregando produtos...</div>;
  }

  return (
    <div>
      <ProductList products={products} title="Whey Protein (Do Banco de Dados!)" />
    </div>
  );
};

export default Whey;