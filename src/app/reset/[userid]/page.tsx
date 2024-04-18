'use client'
import Toaster from "@/components/Toaster";
import { CustomInput } from "@/components/input"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(req) {
    const [formData, setFormData] = useState({
        password: ""
    });
    const [errors, setErrors] = useState({
        password: ""
    });
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const router = useRouter();
    const submitHandler = async (e) => {
        e.preventDefault();
        const user_token = localStorage.getItem('reset_token')
        const response = await fetch('/api/resetpassword', {
            method: 'POST',
            headers: {
                'api-key': process.env.NEXT_PUBLIC_API_KEY!
            },
            body: JSON.stringify({ ...formData, user_token: user_token })
        })
        type ToasterItem = {
            type: string;
            content: string;
        }
        const data = await response.json();
        const toasterItem: ToasterItem = { type: data.type, content: data.message };
        setToasterItems(prevToasterItems => [...prevToasterItems, toasterItem]);
        localStorage.removeItem('reset_token')
        setTimeout(() => {
            router.push('/login')
        }, 3000);
    }
    useEffect(() => {
        const fetchData = async () => {
            let user_token = localStorage.getItem('reset_token');
            if (user_token) {
                const response = await fetch('/api/validatetoken', {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY!
                    },
                    body: JSON.stringify({ user_token: user_token, user_token_params: req.params.userid })
                })
                const data = await response.json();
                if (!data.success) {
                    localStorage.removeItem('reset_token')
                    router.push('/reset?error=' + data.message)
                }
            }
            else {
                router.push('/reset?error=Le token de réinitialisation a expiré.')

            }
        }
        fetchData()
    }, [req.params.userid, router]);
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
                <p className="text-xl">Réinitialisation du mot de passe</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <form onSubmit={submitHandler} className="flex flex-col justify-center items-center p-5 bg-white rounded-[calc(1rem-2px)]">
                        <CustomInput type="password" name="password" labelText="Nouveau mot de passe" value={formData.password} onChange={changeHandler} error={errors.password} />
                        <input type="submit" value="Réinitialiser" className="bg-custom_orange text-white rounded-2xl p-1.5 cursor-pointer" />
                    </form>
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