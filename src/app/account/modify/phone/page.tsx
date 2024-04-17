'use client'

import ClientApplication from "@/components/clientapplication";
import { cryptPassword } from "@/utils/bcrypt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        tel: ""
    });
    const [errors, seterrors] = useState({
        tel: ""
    });
    const changeHandler = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        seterrors({ ...errors, [e.target.name]: "" })
    }
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (!validate()) {
            setLoading(true)
            const response = await fetch('/api/modifyphone', {
                method: 'POST',
                body: JSON.stringify({ ...formData, user_token: localStorage.getItem('token') }),
                headers: {
                    'api-key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
                }
            })
            const data = await response.json();
            if (data.success) {
                localStorage.removeItem('token')
                router.push('/login?message=' + data.message)
                return;
            }
            else {
                setLoading(false)
            }
        }

    }
    const validate = () => {
        const newErrors: {
            tel: string
        } = {
            tel: ""
        };
        const regex = new RegExp('^0[1-6]{1}(([0-9]{2}){4})|((\\s[0-9]{2}){4})|((-[0-9]{2}){4})$')
        if (!regex.test(formData.tel)) {
            newErrors.tel = "Le numéro de téléphone n'est pas valide."
        }
        seterrors(newErrors)
        return newErrors.tel === "";
    }
    return (
        <ClientApplication>
            <title>Nouveau numéro de téléphone</title>
            <div className="flex flex-col gap-7 justify-center items-center min-h-dvh max-h-fit">
                <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-fit">
                    <div className="bg-white flex flex-col gap-10 p-6">
                        <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-3">
                            <label htmlFor="tel">Nouveau numéro de téléphone</label>
                            <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px rounded-lg">
                                <input onChange={changeHandler} type="tel" name="tel" value={formData.tel} id="tel" className="bg-gray-200 p-1.5 rounded-[calc(0.5rem-1px)] text-center" />
                            </div>
                            <p className="text-sm text-red-400 font-bold">{errors.tel}</p>
                            {!loading ? (
                                <input type="submit" value={`Enregistrer`} className={`bg-custom_orange text-white p-1.5 rounded-lg cursor-pointer`} />
                            ) : (
                                <p className={`bg-custom_orange text-white p-1.5 rounded-lg cursor-not-allowed animate-pulse`}>Chargement...</p>
                            )}
                        </form>
                    </div>
                </div>
                <Link href={'/account'} className="bg-custom_orange text-white p-1.5 rounded-lg">Revenir au compte</Link>
            </div>
        </ClientApplication>
    )
}