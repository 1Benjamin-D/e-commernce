'use client'
import ClientApplication from "@/components/clientapplication";
import { cryptPassword } from "@/utils/bcrypt";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        old_pass: "",
        pass: "",
        c_pass: ""
    });
    const [errors, seterrors] = useState({
        old_pass: "",
        pass: "",
        c_pass: ""
    });
    const [token, setToken] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const user_token = localStorage.getItem('token');
            if (user_token) {
                const response = await fetch('/api/validatetoken', {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY!
                    },
                    body: JSON.stringify({ user_token: user_token })
                })
                const data = await response.json();
                if (!data.success) {
                    localStorage.removeItem('token');
                } else {
                    setToken(user_token);
                }
            }
        }
        fetchData();
    }, []);
    const changeHandler = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        seterrors({ ...errors, [e.target.name]: "" })
    }
    const [loading, setloading] = useState(false);
    const router = useRouter();
    const submitHandler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (!validate()) {
            setloading(true)
            const response = await fetch('/api/modifypassword', {
                method: 'POST',
                body: JSON.stringify({ ...formData, user_token: token }),
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
                setloading(false)
            }
        }

    }
    const validate = () => {
        const { old_pass, pass, c_pass } = formData;
        const newErrors: {
            old_pass: string;
            pass: string;
            c_pass: string;
        } = {
            old_pass: "",
            pass: "",
            c_pass: ""
        };

        let hasError = false;

        for (const key in formData) {
            if (Object.prototype.hasOwnProperty.call(formData, key)) {
                const elem = formData[key];
                if (elem.indexOf(" ") >= 0) {
                    newErrors[key as keyof typeof formData] = `Ce champ ne peut pas contenir d'espace.`;
                    hasError = true;
                }
                if (elem === "") {
                    newErrors[key as keyof typeof formData] = `Ce champ ne peut pas être vide.`;
                    hasError = true;
                }
            }
        }

        if (pass !== c_pass) {
            newErrors.pass = "Le mot de passe et celui de confirmation ne correspondent pas.";
            hasError = true;
        }

        seterrors(newErrors);
        return hasError;
    };
    return (
        <ClientApplication>
            <title>Changement du mot de passe</title>
            <div className="flex flex-col gap-7 justify-center items-center min-h-dvh max-h-fit">
                <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-fit">
                    <div className="bg-white flex flex-col gap-10 p-6">
                        <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-3">
                            <label htmlFor="old_pass">Ancien mot de passe</label>
                            <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px rounded-lg">
                                <input onChange={changeHandler} type="password" name="old_pass" value={formData.old_pass} id="old_pass" className="bg-gray-200 p-1.5 rounded-[calc(0.5rem-1px)] text-center" />
                            </div>
                            <p className="text-sm text-red-400 font-bold text-wrap w-72 text-center">{errors.old_pass}</p>
                            <label htmlFor="pass">Nouveau mot de passe</label>
                            <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px rounded-lg">
                                <input onChange={changeHandler} type="password" name="pass" value={formData.pass} id="pass" className="bg-gray-200 p-1.5 rounded-[calc(0.5rem-1px)] text-center" />
                            </div>
                            <p className="text-sm text-red-400 font-bold text-wrap w-72 text-center">{errors.pass}</p>
                            <label htmlFor="c_pass">Confirmation du nouveau mot de passe</label>
                            <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px rounded-lg">
                                <input onChange={changeHandler} type="password" name="c_pass" value={formData.c_pass} id="c_pass" className="bg-gray-200 p-1.5 rounded-[calc(0.5rem-1px)] text-center" />
                            </div>
                            <p className="text-sm text-red-400 font-bold text-wrap w-72 text-center">{errors.c_pass}</p>
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