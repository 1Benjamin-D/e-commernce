'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setproducts] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const Products = await fetch('../api/products');
        if (Products.ok) {
          const data: any[] = await Products.json();
          setproducts(data);
        }
      } catch (error) {
        console.error('Error fetching sale products:', error);
      }
    };

    fetchSaleProducts();
  }, []);

  return (
    <div className="font-Luciole_Regular flex flex-col items-center mt-[50px] lg:flex-row lg:justify-around lg:flex-wrap gap-4 m-4">
      {products && products.map((sProduct: any) => (

        <div key={sProduct.id} className="flex flex-col items-center bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-[20px] w-[250px] h-[350px] px-[30px] py-[20px] mt-6 relative">
          {sProduct.is_sale == true &&
            <Image src="/Images/promo.png" alt="promotion" width={1000} height={1000} className="absolute right-[-33px] top-[-35px] w-[100px] z-10" />
          }
          <Image src={sProduct.product_image} alt={sProduct.product_name} width={1000} height={1000} className="w-36" />
          <h2 className="mt-3">{sProduct.product_name}</h2>
          <p className="mt-3">
            {/* Afficher le prix initial */}
            {sProduct.is_sale == true 
            ? <span className="line-through">{sProduct.product_price.toFixed(2)}€ </span>
            : <span className="">{sProduct.product_price.toFixed(2)}€ </span>
            }
            {/* Afficher le pourcentage de réduction */}
            {sProduct.is_sale == true &&
              <span>({sProduct.sale_percent}%) </span>
            }
            {/* Calculer et afficher le prix réduit arrondi à deux chiffres après la virgule */}
            {sProduct.is_sale == true &&
              <span className="text-red-500">
                {((100 - sProduct.sale_percent) / 100 * sProduct.product_price).toFixed(2)}€
              </span>
            }
          </p>
          <button type="button"><Image src='/Images/Add to cart home.png' alt="add_to_cart" width={1000} height={1000} className=" w-[70px] h-[50px] mt-3 " /></button>
        </div>
      ))}
    </div>
  );
}