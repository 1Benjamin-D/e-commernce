'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientApplication({ children }) {
    const router = useRouter();
    const path = usePathname()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let user_token = localStorage.getItem('token');
                const response = await fetch('/api/validatetoken', {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.NEXT_PUBLIC_API_KEY!
                    },
                    body: JSON.stringify({ user_token: user_token })
                })
                const data = await response.json();
                if (!data.success) {
                    const redirect = ['/account', '/account/modify']
                    redirect.forEach(elem => {
                        if (path.includes(elem)) {
                            router.push('/login')
                        }
                    })
                    localStorage.removeItem('token')
                }
                else {
                    const redirect = ['/login', '/register']
                    redirect.forEach(elem => {
                        if (path.includes(elem)) {
                            router.push('/account')
                        }
                    })
                }
            }
            catch (error) {
                console.error("Erreur lors de la validation du Token :", error);
            }

        }
        fetchData()
    }, [router, path]);
    return (
        <>
            {children}
        </>
    );
}