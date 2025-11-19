import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Creatina: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => {
        const creatinaOnly = data.filter((item: any) => item.category_id === 2);

        const formattedProducts = creatinaOnly.map((item: any) => ({
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
        console.error("Erro:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 font-bold text-orange-900">Carregando Creatinas...</div>;

  return (
    <div>
      <ProductList products={products} title="Creatina (Do Banco!)" />
    </div>
  );
};

export default Creatina;