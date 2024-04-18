'use client'
import ClientApplication from "@/components/clientapplication";
import ModifyInput from "@/components/modifyInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [data, setData] = useState({});
    useEffect(() => {
        setLoading(true)
        const user_token = localStorage.getItem('token');
        const fetchData = async () => {
            if (user_token) {
                const response = await fetch(`/api/getuserbytoken?user_token=${user_token}`, {
                    method: 'GET',
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY!
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setData(data.data);
                    setLoading(false)
                }
            }
        };
        if (user_token) {
            fetchData();
        }
    }, []);
    //TODO: Logique a faire pour la déconnexion
    const router = useRouter();
    const logoutHandler = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token')
            router.push('/login')
        }
    }

    // Affiche un état de chargement tant que les données ne sont pas chargées
    if (loading) {
        return (
            <ClientApplication>
                <div>Loading...</div>
            </ClientApplication>
        );
    }

    // Affiche le contenu de la page une fois que les données sont chargées
    return (
        <ClientApplication>
            <title>Compte</title>
            <div className="flex flex-col justify-center items-center min-h-dvh max-h-fit gap-10">
                <p className="font-bold text-2xl">Mon profil</p>
                <div className="bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-px w-fit">
                    <div className="bg-white flex flex-col gap-10 p-6">
                        <ModifyInput name="Nom" value={data.name} editable={true} link="/account/modify/name" />
                        <ModifyInput name="Email" value={data.email} editable={true} link="/account/modify/email" />
                        <ModifyInput name="Mot de passe" value={"Vous ne pouvez pas voir votre mot de passe."} editable={true} link="/account/modify/password" />
                        <ModifyInput name="Numéro de téléphone" value={data.numero_phone} editable={true} link="/account/modify/phone" />
                        <ModifyInput name="Numéro client" value={data.id} editable={false} />
                    </div>
                </div>
                <div>
                    <button onClick={logoutHandler} className="bg-red-500 text-white rounded-xl p-2">Se déconnecter</button>
                </div>
            </div>
        </ClientApplication>
    );
}