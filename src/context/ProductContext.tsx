import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Stock
  category_id: number;
  description?: string;
}

interface ProductContextType {
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (updatedProduct: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Carregar produtos do Supabase
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*').order('id');
    if (error) {
      console.error('Error fetching products:', error);
    }
    if (data) {
      setProducts(data);
    }
  }

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    const { data, error } = await supabase.from('products').insert(newProduct).select().single();
    if (error) {
      console.error('Error adding product:', error);
      throw error;
    }
    if (data) {
      setProducts(prev => [...prev, data]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    const { error } = await supabase
      .from('products')
      .update(updatedProduct)
      .eq('id', updatedProduct.id);

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }

    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(p => p.id === id);
  };

  return (
    <ProductContext.Provider value={{ products, selectedProduct, setSelectedProduct, addProduct, updateProduct, deleteProduct, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProduct deve ser usado dentro de ProductProvider');
  return context;
};
