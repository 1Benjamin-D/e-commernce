'use client'
import Layout from "@/pages/layout";
import Image from "next/image";
import { cryptPassword } from "@/utils/bcrypt";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { validatetoken } from "@/utils/validatetoken";
import Toaster from "@/components/Toaster";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Head from "next/head";
import AddToCart from "@/components/AddToCart";

interface Article {
    article: {
        data: {
            id: number
            product_name: string
            product_description: string
            product_image: string
            product_price: number
            ingredient: string
            is_sale: boolean
        }
        success: boolean
    }
}
export default function Page({ article }: Article) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    interface ToasterItem {
        content: string;
        type: string;
    }
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
    useEffect(() => {
        if (validatetoken() !== undefined) {
            if (validatetoken()!.expired) {
                router.push("/");
            }
        }
    }, [router]);
    useEffect(() => {
        if (toasterItems.length >= 5) {
            setToasterItems(prevToasterItems => {
                const updatedToasterItems = [...prevToasterItems];
                updatedToasterItems.shift();
                return updatedToasterItems;
            })
        }
        if (toasterItems.length > 0) {
            const timer = setTimeout(() => {
                setToasterItems(prevToasterItems => {
                    const updatedToasterItems = [...prevToasterItems];
                    updatedToasterItems.shift();
                    return updatedToasterItems;
                });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toasterItems.length]);
    const clickHandler = (action: string) => {
        if (action === "add") {
            if (quantity < 99) {
                setQuantity(quantity + 1);
            } else {
                return;
            }
        } else if (action === "remove") {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            } else {
                return;
            }
        } else {
            return;
        }
    }
    const addToCart = async () => {
        if (!isAddingToCart) {
            setIsAddingToCart(true)
            const token = localStorage.getItem("token")!;
            const response = await fetch('/api/addtocart', {
                method: "POST",
                headers: {
                    "API-Key": await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
                },
                body: JSON.stringify({ productId: article.data.id, token: token, productQuantity: quantity })
            });
            type ToasterItem = {
                type: string;
                content: string;
            }
            const data = await response.json();
            const toasterItem: ToasterItem = { type: data.type, content: data.message };
            toasterItems.push(toasterItem)
        } else {
            const toasterItem: ToasterItem = { type: 'warning', content: 'Vous allez trop vite.' }
            toasterItems.push(toasterItem)
            return;
        }
        setIsAddingToCart(false)
    }
    const closeToast = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt((e.currentTarget as HTMLElement).closest('div')!.getAttribute('toast_index') as string);
        setToasterItems(prevToasterItems => {
            const updatedToasterItems = [...prevToasterItems];
            updatedToasterItems.splice(index, 1);
            return updatedToasterItems;
        });
    }
    if (article.success) {
        return (
            <Layout>
                <Head>
                    <title>{article.data.product_name}</title>
                </Head>
                <div className="mobile:hidden flex min-h-dvh max-h-fit justify-center items-center">
                    <div className="mobile:hidden flex justify-around items-center">
                        <div className="flex flex-col items-center gap-10">
                            <Image src={article.data.product_image} alt="test" width="200" height="0"
                                className="w-52 h-auto"></Image>
                            <div
                                className="flex flex-col justify-center items-center gap-2 p-2">
                                <AddToCart quantity={quantity} clickEventAddToCart={addToCart} clickEventQuantity={clickHandler} />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col gap-3">
                            <div
                                className="text-xl rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                                <div className="flex flex-col items-center gap-10 bg-white p-5 rounded-[calc(1rem-2px)]">
                                    <p className="text-4xl">{article.data.product_name}</p>
                                    <div>
                                        <p className="underline">Description :</p>
                                        <p>{article.data.product_description}</p>
                                    </div>
                                    {article.data.is_sale ? (
                                        <div className="flex gap-1">
                                            <p className="line-through">{article.data.product_price}€</p>
                                            <p className="text-red-500">{(article.data.product_price - (article.data.product_price * 0.20)).toFixed(2)}€</p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-1">
                                            <p>{article.data.product_price}€</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className="text-xl rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                                <div className="flex flex-col gap-2 bg-white p-5 rounded-[calc(1rem-2px)]">
                                    <p className="underline">Ingrédients :</p>
                                    <p>{article.data.ingredient}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden mobile:flex justify-center items-center min-h-dvh max-h-fit">
                    <div className="hidden mobile:flex flex-col justify-center items-center gap-5">
                        <Image src={article.data.product_image} alt="test" width="200" height="0" priority
                            className="w-62 h-auto"></Image>
                        <p className="text-lg">{article.data.product_name}</p>
                        <p className="text-center text-sm px-5">{article.data.product_description}</p>
                        {article.data.is_sale ? (
                            <div className="flex gap-1">
                                <p className="line-through">{article.data.product_price}€</p>
                                <p className="text-red-500">{(article.data.product_price - (article.data.product_price * 0.20)).toFixed(2)}€</p>
                            </div>
                        ) : (
                            <div className="flex gap-1">
                                <p>{article.data.product_price}€</p>
                            </div>
                        )}
                        <AddToCart quantity={quantity} clickEventAddToCart={addToCart} clickEventQuantity={clickHandler} />
                    </div>
                </div>
                <div className="fixed mobile:w-2/3 mobile:h-fit mobile:top-5 mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 bottom-5 right-5 flex flex-col gap-3">
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
            </Layout>
        )
    } else {
        return (
            <Layout>
                <div>
                    <h1>404 - Page non trouvé</h1>
                    <p>{"La page que vous cherchiez n'a pas été trouvé."}</p>
                    <button className="bg-slate-600 text-white p-2 rounded-2xl"
                        onClick={() => router.push("/")}>Retour en arriere.
                    </button>
                </div>
            </Layout>
        )
    }
}

export async function getServerSideProps({ query }: Params) {
    const productId = query.id;
    const apiUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getproduct` : `http://localhost:3000/api/getproduct`;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'API-Key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
        },
        body: JSON.stringify({ productId: productId })
    })
    const data = await response.json();
    return {
        props: {
            article: data,
            domain: process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000"
        }
    }
}