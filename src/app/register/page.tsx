import React from "react";
import {CustomInput} from "@/components/input";
import Link from "next/link";

export default function Page(){
    return (
        <main className="h-dvh flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-3xl text-custom_red">Inscription</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <form action="" className="flex flex-col items-center gap-5 bg-white p-10 rounded-[calc(1rem-1px)]">
                        <CustomInput labelText="Nom d'utilisateur" name="username" type="text"/>
                        <CustomInput labelText="Email" name="email" type="email"/>
                        <CustomInput labelText="Mot de passe" name="password" type="password"/>
                        <CustomInput labelText="Confirmation du mot de passe" name="confirm_password" type="password"/>
                        <input type="submit" value="Inscription"
                               className="bg-custom_orange text-white text-lg p-3 rounded-2xl cursor-pointer"/>
                        <p className="text-lg">Déjà inscrit ? <Link href="/login"><span
                            className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E]">Connexion</span></Link>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    )
}