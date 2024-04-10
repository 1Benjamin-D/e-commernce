import { useEffect, useState } from "react";

export interface Product {
    id: number;
    product_name: string;
    product_image: string | null; 
    product_description: string;
    product_price: number;
    is_sale: boolean;
    sale_percent: string | null;
    product_categoryid: number;
    product_subcategory_id: number | null; 
    poids: string | null;
    ingredient: string | null;
}

export default function ProductList() {

  const [products, setProducts] = useState<Product[]>([]);
  const name = "";
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/product?name=${name}`);
      if (response.ok) {
        const data: Product[] = await response.json();
        console.log("Produits chargés:", data); // Log des données chargées
        setProducts(data);
      }
    }
    fetchData();
  }, [name]);

  return (
    <div>
      {products.map((product) => ( 
        <div key={product.id}> 
          <p>{product.product_name}</p>
        </div>
      ))}
    </div>
  );
}