'use client'
import Erreur from "@/app/not-found";
import AddToCart from "@/components/AddToCart";
import Toaster from "@/components/Toaster";
import ClientApplication from "@/components/clientapplication";
import { cryptPassword } from "@/utils/bcrypt";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page(req: Params) {
    interface Article {
        id: bigint
        product_image: string
        product_name: string
        product_description: string
        product_price: number
        is_sale: string
        ingredient: string
    }
    const [article, setArticle] = useState<Article>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let idProduct = req.params.id;
        const fetchData = async () => {
            let apiKey = await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
            const response = await fetch(`/api/getproduct?productId=${idProduct}&apiKey=${apiKey}`, {
                method: 'GET'
            })
            const data = await response.json();
            if (data.success) {
                setArticle(data.data);
            }
            setIsLoading(false)
        }
        fetchData();
    }, [req.params.id])
    const [quantity, setQuantity] = useState(1)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    interface ToasterItem {
        content: string;
        type: string;
    }
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
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
                method: 'POST',
                headers: {
                    "api-key": await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
                },
                body: JSON.stringify({ productId: article!.id, token: token, productQuantity: quantity }),
            })
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
    if (!article && !isLoading) {
        return (
            <ClientApplication>
                <Erreur />
            </ClientApplication>
        )
    }
    if (!isLoading) {
        return (
            <ClientApplication>
                <div className="mobile:hidden flex min-h-dvh max-h-fit justify-center items-center">
                    <div className="mobile:hidden flex justify-around items-center">
                        <div className="flex flex-col items-center gap-10">
                            <Image src={article!.product_image} alt="test" width="200" height="0"
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
                                    <p className="text-4xl">{article!.product_name}</p>
                                    <div>
                                        <p className="underline">Description :</p>
                                        <p>{article!.product_description}</p>
                                    </div>
                                    {article!.is_sale ? (
                                        <div className="flex gap-1">
                                            <p className="line-through">{article!.product_price}€</p>
                                            <p className="text-red-500">{(article!.product_price - (article!.product_price * 0.20)).toFixed(2)}€</p>
                                        </div>
                                    ) : (
                                        <div className="flex gap-1">
                                            <p>{article!.product_price}€</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div
                                className="text-xl rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                                <div className="flex flex-col gap-2 bg-white p-5 rounded-[calc(1rem-2px)]">
                                    <p className="underline">Ingrédients :</p>
                                    <p>{article!.ingredient}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden mobile:flex justify-center items-center min-h-dvh max-h-fit">
                    <div className="hidden mobile:flex flex-col justify-center items-center gap-5">
                        <Image src={article!.product_image} alt={article!.product_name} width="200" height="0" priority
                            className="w-62 h-auto"></Image>
                        <p className="text-lg">{article!.product_name}</p>
                        <p className="text-center text-sm px-5">{article!.product_description}</p>
                        {article!.is_sale ? (
                            <div className="flex gap-1">
                                <p className="line-through">{article!.product_price}€</p>
                                <p className="text-red-500">{(article!.product_price - (article!.product_price * 0.20)).toFixed(2)}€</p>
                            </div>
                        ) : (
                            <div className="flex gap-1">
                                <p>{article!.product_price}€</p>
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
                <Head>
                    <title>{article!.product_name}</title>
                </Head>
            </ClientApplication>
        )
    } else {
        return (
            <ClientApplication>
                <div className="flex justify-center items-center min-h-dvh max-h-fit">
                    <p className="animate-pulse">Chargement de votre produit...</p>
                </div>
            </ClientApplication>
        )
    }
}