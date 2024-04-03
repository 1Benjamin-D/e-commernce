import React from "react";

export default function Page() {
    return (
        <main className="h-dvh flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-3xl text-custom_red">Connexion</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <form className="flex flex-col items-center gap-5 bg-white p-14 rounded-[calc(1rem-1px)]">
                        <CustomInput type="text" name="username" labelText="Nom d'utilisateur"/>
                        <CustomInput type="password" name="password" labelText="Mot de passe"/>
                        <input type="submit" value="Connexion"
                               className="bg-custom_orange text-white text-lg p-3 rounded-2xl cursor-pointer"/>
                        <p className="text-lg">Pas de compte ? <Link href="/register"><span
                            className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E]">Inscription</span></Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}

import {CustomInput} from "@/components/input";
import Link from "next/link";
