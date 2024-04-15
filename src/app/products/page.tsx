'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Product {
    id: number;
    product_name: string;
    product_image: string;
    product_price: number;
    is_sale: boolean;
    sale_percent?: string;
    product_categoryid: number;
    product_subcategory_id?: number;
}

interface ProductsProps {
    selectedCategoryId: number | null;
    selectedSubCategoryId: number | null;
}

const Products: React.FC<ProductsProps> = ({ selectedCategoryId, selectedSubCategoryId }) => {
    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('../api/products');
                if (response.ok) {
                    const data: Product[] = await response.json();
                    const filteredProducts = data.filter((product) => {
                        if (selectedCategoryId !== null && product.product_categoryid !== selectedCategoryId) {
                            return false;
                        }
                        if (selectedSubCategoryId !== null && product.product_subcategory_id !== selectedSubCategoryId) {
                            return false;
                        }
                        return true;
                    });
                    setProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategoryId, selectedSubCategoryId]);

    return (
        <div
            className="font-Luciole_Regular flex flex-col items-center mt-[50px] lg:flex-row lg:justify-around lg:flex-wrap gap-4 m-4">
            {products && products.map((product) => (
                <Link key={product.id} href={`/${product.id}`}>
                    <div
                        className="flex flex-col items-center bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-[20px] w-[250px] h-[350px] px-[30px] py-[20px] mt-6 relative">
                        {product.is_sale && <Image src="/Images/promo.png" alt="promotion" width={1000} height={1000}
                            className="absolute right-[-33px] top-[-35px] w-[100px] z-10" />}
                        <Image src={product.product_image} alt={product.product_name} width={1000} height={1000}
                            className="w-36" />
                        <h2 className="mt-3">{product.product_name}</h2>
                        <p className="mt-3">
                            {product.is_sale ? (
                                <>
                                    <span className="line-through">{product.product_price.toFixed(2)}€ </span>
                                    <span>({product.sale_percent}%) </span>
                                    <span
                                        className="text-red-500">{((100 - Number(product.sale_percent)) / 100 * product.product_price).toFixed(2)}€</span>
                                </>
                            ) : (
                                <span>{product.product_price.toFixed(2)}€</span>
                            )}
                        </p>
                        <button type="button"><Image src='/Images/Add to cart home.png' alt="add_to_cart" width={1000}
                            height={1000} className=" w-[70px] h-[50px] mt-3 " /></button>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Products;
