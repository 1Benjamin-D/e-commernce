'use client'

import Toaster from "@/components/Toaster";
import ClientApplication from "@/components/clientapplication";
import LoadingP from "@/components/loadingP";
import { cryptPassword } from "@/utils/bcrypt";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface ToasterItem {
    content: string;
    type: string;
}
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

const Products: React.FC<ProductsProps> = ({ selectedCategoryId, selectedSubCategoryId, addToToaster }) => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isloading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    method: "GET",
                    headers: {
                        "api-key": await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
                    },
                });
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
                    setLoading(true);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [selectedCategoryId, selectedSubCategoryId]);
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
    useEffect(() => {
        if (toasterItems.length >= 5) {
            toasterItems.shift()
        }
    }, [toasterItems, toasterItems.length]);
    const [isadding, setIsadding] = useState(false);
    const addToCartHandler = async (e: { target: { closest: (arg0: string) => { (): any; new(): any; attributes: { value: any; }[]; }; }; }) => {
        if (isadding) {
            const toasterItem: ToasterItem = { type: "warning", content: "Vous faites ca trop vite." };
            setToasterItems(prevToasterItems => [...prevToasterItems, toasterItem]);
            setIsadding(false)
            return;
        }
        setIsadding(true)
        const productId = e.target.closest('button').attributes[0].value
        const response = await fetch('/api/addtocart', {
            method: 'POST',
            headers: {
                'api-key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
            },
            body: JSON.stringify({ productId: parseInt(productId), token: localStorage.getItem('token'), quantity: 1 })
        })
        const data = await response.json()
        if (data.success) {
            setIsadding(false)
        }
        const toasterItem: ToasterItem = { type: data.type, content: data.message };
        setToasterItems(prevToasterItems => [...prevToasterItems, toasterItem]);
    }
    const closeToast = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt((e.currentTarget as HTMLElement).closest('div')!.getAttribute('toast_index') as string);
        setToasterItems(prevToasterItems => {
            const updatedToasterItems = [...prevToasterItems];
            updatedToasterItems.splice(index, 1);
            return updatedToasterItems;
        });
    }
    if (!isloading || !products) {
        const loadingCards = Array.from({ length: 60 }, (_, index) => (
            <div key={index} className="product-card">
                <LoadingP />
            </div>
        ));

        return (
            <div className="font-Luciole_Regular flex flex-col items-center mt-[50px] lg:flex-row lg:justify-around lg:flex-wrap gap-4 m-4">
                {loadingCards}
            </div>
        );
    }

    return (
        <ClientApplication>
            <div
                className="font-Luciole_Regular flex flex-col items-center mt-[50px] lg:flex-row lg:justify-around lg:flex-wrap gap-4 m-4">
                {products && products.map((product) => (
                    <div className="relative mt-6 flex gap-3" key={product.id}>
                        <Link href={`/product/${product.id}`} className="flex flex-col items-center" >
                            <div className="flex flex-col items-center bg-gradient-to-b from-firstStepGradient via-secondStepGradient to-thirdStepGradient p-[2px] rounded-[20px] w-[250px] h-[350px] px-[30px] py-[20px] relative" >
                                {product.is_sale && <Image src="/Images/promo.png" alt="promotion" width={1000} height={1000}
                                    className="absolute right-[-33px] top-[-35px] w-[100px] z-10" />}
                                <Image src={product.product_image} alt={product.product_name} width={1000} height={1000} className="w-36" />
                                <h2 className="mt-3">{product.product_name}</h2>
                                <p className="mt-3">
                                    {product.is_sale ? (
                                        <>
                                            <span className="line-through">{product.product_price.toFixed(2)}€ </span>
                                            <span>({product.sale_percent}%) </span>
                                            <span className="text-red-500">{((100 - Number(product.sale_percent)) / 100 * product.product_price).toFixed(2)}€</span>
                                        </>
                                    ) : (
                                        <span>{product.product_price.toFixed(2)}€</span>
                                    )}
                                </p>
                            </div>
                        </Link>
                        <button onClick={addToCartHandler} data-id={product.id} type="button"><Image src='/Images/Add to cart home.png' alt="add_to_cart" width={1000} height={1000} className=" w-[70px] h-[50px] mt-3 absolute left-[36%] top-[70%]" /></button>
                    </div>
                ))
                }
            </div >
            <div
                className="fixed mobile:w-2/3 mobile:h-fit mobile:top-5 mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 bottom-5 right-5 flex flex-col gap-3">
                {toasterItems.map(({ content, type }, index): React.JSX.Element => {
                    return (
                        <Toaster key={index}
                            toast_index={index}
                            content={content}
                            type={type}
                            onClickEvent={closeToast} />
                    );
                })}
            </div>
        </ClientApplication>
    );
};

export default Products;