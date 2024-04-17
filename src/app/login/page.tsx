'use client'
import React, { FormEvent, useEffect, useState } from "react";
import { CustomInput } from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import { cryptPassword } from "@/utils/bcrypt";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Toaster from "@/components/Toaster";
import ClientApplication from "@/components/clientapplication";

interface Form {
    username: string
    password: string
}

export default function Page() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState<Form>({ password: "", username: "" })
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    interface ToasterItem {
        content: string;
        type: string;
    }
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
    const onChange = (e: { target: HTMLInputElement }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    }
    useEffect(() => {
        if (toasterItems.length >= 5) {
            toasterItems.shift()
        }
    }, [toasterItems, toasterItems.length]);
    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'api-key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!),
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            type ToasterItem = {
                type: string;
                content: string;
            }
            const toasterItem: ToasterItem = { type: data.type, content: data.message };
            setToasterItems(prevToasterItems => [...prevToasterItems, toasterItem]);
            if (data.success) {
                let token = data.token;
                localStorage.setItem("token", token);
                router.push("/")
            }
        } catch (error) {
            console.error("Erreur lors de l'envoie du formulaire :", error)
        }
    }
    const closeToast = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt((e.currentTarget as HTMLElement).closest('div')!.getAttribute('toast_index') as string);
        setToasterItems(prevToasterItems => {
            const updatedToasterItems = [...prevToasterItems];
            updatedToasterItems.splice(index, 1);
            return updatedToasterItems;
        });
    }
    const clickHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        if (target.alt === 'show-password') {
            setShowPassword(!showPassword);
        }
    };
    return (
        <ClientApplication>
            <main className="h-dvh flex justify-center items-center">
                <title>Connexion</title>
                <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-3xl text-custom_red">Connexion</p>
                    <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                        <form autoComplete="off"
                            className="flex flex-col items-center gap-5 bg-white p-14 mobile:p-7 rounded-[calc(1rem-2px)]"
                            onSubmit={formHandler}>
                            <CustomInput type="text" name="username" labelText="Nom d'utilisateur" error={errors.username}
                                onChange={onChange}
                                value={formData.username} />
                            <div className="relative">
                                <CustomInput labelText="Mot de passe" name="password"
                                    type={`${!showPassword ? 'password' : 'text'}`} onChange={onChange}
                                    value={formData.password} error={errors.password} />
                                <Image alt="show-password"
                                    src={`${!showPassword ? '/images/eye.svg' : '/images/eye-slash.svg'}`}
                                    width="100" height="0"
                                    className="absolute h-7 w-auto top-[48px] right-8 cursor-pointer"
                                    onClick={clickHandler}></Image>
                            </div>
                            <input type="submit" value="Connexion"
                                className="bg-custom_orange text-white text-lg p-3 rounded-2xl cursor-pointer" />
                            <p className="text-lg">Pas de compte ? <Link href="/register"><span
                                className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E]">Inscription</span></Link>
                            </p>
                            <p className="text-lg">Mot de passe <Link href="/reset" className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E] cursor-pointer">oublié</Link> ?</p>
                        </form>
                    </div>
                </div>
                <div
                    className="fixed mobile:w-2/3 mobile:h-fit mobile:top-5 mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 bottom-5 right-5 flex flex-col">
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
            </main>
        </ClientApplication>
    )
}