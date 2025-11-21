import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Stock
  category_id: number;
  description?: string;
}

// MOCK DATA INITIALIZATION
const MOCK_PRODUCTS: Product[] = [
  // Whey Protein (Category 1)
  { id: 1, name: 'Whey Protein Isolado', price: 149.90, image: '/wheypadrao.webp', quantity: 20, category_id: 1, description: 'Proteína isolada de alta qualidade.' },
  { id: 2, name: 'Whey Protein Concentrado', price: 99.90, image: '/wheypadrao.webp', quantity: 50, category_id: 1, description: 'O melhor custo benefício.' },
  { id: 3, name: 'Whey Protein Hidrolisado', price: 189.90, image: '/wheypadrao.webp', quantity: 15, category_id: 1, description: 'Absorção ultra rápida.' },
  
  // Creatina (Category 2)
  { id: 4, name: 'Creatina Monohidratada', price: 69.90, image: '/wheypadrao.webp', quantity: 100, category_id: 2, description: 'Força e explosão muscular.' },
  
  // Vitaminas (Category 3)
  { id: 5, name: 'Multivitamínico A-Z', price: 49.90, image: '/vitaminapadrao.webp', quantity: 30, category_id: 3, description: 'Saúde completa.' },
  { id: 6, name: 'Vitamina C 1000mg', price: 29.90, image: '/vitaminapadrao.webp', quantity: 40, category_id: 3, description: 'Imunidade em dia.' },

  // Pré-Treino (Category 4)
  { id: 7, name: 'Pré-Treino Insane', price: 129.90, image: '/pretreinopadrao.webp', quantity: 25, category_id: 4, description: 'Foco e energia extrema.' },
];

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load from localStorage or use Mocks
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(MOCK_PRODUCTS);
      localStorage.setItem('products', JSON.stringify(MOCK_PRODUCTS));
    }
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, selectedProduct, setSelectedProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct deve ser usado dentro de ProductProvider');
  return context;
};
