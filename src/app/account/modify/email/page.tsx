'use client'
import ClientApplication from "@/components/clientapplication";
import { cryptPassword } from "@/utils/bcrypt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        email: ""
    });
    const [errors, setErrors] = useState({
        email: ""
    });
    const router = useRouter();
    const changeHandler = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: "" })
    }
    const [loading, setLoading] = useState(false);
    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true)
            const response = await fetch('/api/modifyemail', {
                method: 'POST',
                headers: {
                    'api-key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
                },
                body: JSON.stringify({ ...formData, user_token: localStorage.getItem('token') })
            })
            const data = await response.json();
            if (!data.success) {
                setLoading(false)
            }
            else {
                localStorage.removeItem('token')
                router.push('/login?message=' + data.message)
                return;
            }
        }
    }
    const validate = () => {
        const { email } = formData;
        const newErrors: {
            email: string
        } = {
            email: ""
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
            newErrors.email = "Le format de l'email n'est pas valide."
        }
        setErrors(newErrors)
        return newErrors.email === ""
    }
    return (
        <ClientApplication>
            <title>Changement du mail</title>
            <div className="flex flex-col gap-7 justify-center items-center min-h-dvh max-h-fit">
                <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-fit">
                    <div className="bg-white flex flex-col gap-10 p-6">
                        <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-3">
                            <label htmlFor="email">Nouveau mail</label>
                            <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px rounded-lg">
                                <input onChange={changeHandler} type="text" name="email" value={formData.email} id="email" className="bg-gray-200 p-1.5 rounded-[calc(0.5rem-1px)] text-center" />
                            </div>
                            <p className="text-sm text-red-400 font-bold">{errors.email}</p>
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