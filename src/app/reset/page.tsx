'use client'
import Toaster from "@/components/Toaster";
import { CustomInput } from "@/components/input";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        email: ""
    })
    const [errors, setErrors] = useState({
        email: ""
    })
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await fetch('/api/sendmailreset', {
                method: 'POST',
                headers: {
                    'api-key': process.env.NEXT_PUBLIC_API_KEY!
                },
                body: JSON.stringify({ ...formData })
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
                localStorage.setItem("reset_token", token);
            }
        }
    }
    const validateForm = () => {
        const { email } = formData
        // @ts-ignore
        const newErrors: {
            email: string
        } = {};
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        if (!regex.test(email)) {
            newErrors.email = "L'email n'est pas dans un format valide."
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    interface ToasterItem {
        content: string;
        type: string;
    }
    useEffect(() => {
        if (toasterItems.length >= 5) {
            toasterItems.shift()
        }
    }, [toasterItems, toasterItems.length]);
    const closeToast = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt((e.currentTarget as HTMLElement).closest('div')!.getAttribute('toast_index') as string);
        setToasterItems(prevToasterItems => {
            const updatedToasterItems = [...prevToasterItems];
            updatedToasterItems.splice(0, 2);
            return updatedToasterItems;
        });
    }
    return (
        <>
            <div className="min-h-dvh max-h-fit flex flex-col justify-center items-center gap-5">
                <title>Réinitialisation du mot de passe</title>
                <p className="text-2xl text-custom_red">Réinitialisation du mot de passe</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <div className="flex flex-col justify-center items-center gap-10 p-5 bg-white rounded-[calc(1rem-2px)]">
                        <form onSubmit={submitHandler} className="flex flex-col justify-center items-center">
                            <CustomInput type="email" name="email" labelText="L'email du compte" value={formData.email} onChange={changeHandler} error={errors.email} />
                            <input type="submit" value="Réinitialiser" className="bg-custom_orange text-white rounded-2xl p-1.5 cursor-pointer" />
                        </form>
                        <p className="text-lg">Retour à la <Link href="/login" className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E] cursor-pointer">connexion</Link></p>
                    </div>
                </div>
            </div>
            <div
                className="fixed mobile:w-2/3 mobile:h-fit mobile:top-5 mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 bottom-5 right-5 flex flex-col">
                {toasterItems.slice(0, 1).map(({ content, type }, index): React.JSX.Element => {
                    return (
                        <Toaster key={index}
                            toast_index={index}
                            content={content}
                            type={type}
                            onClickEvent={closeToast} />
                    );
                })}
            </div>
        </>

    )
}