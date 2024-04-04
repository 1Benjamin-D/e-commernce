'use client'
import React, {useState} from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setErrors({...errors, [e.target.name]: ""})
    }
    const formHandler = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            if(data.success){
                setSuccessMessage(data.message)
            }
            else{
                setErrorMessage(data.message)
            }
        }
        catch(error){
            console.error("Erreur lors de l'envoie du formulaire :", error)
        }
    }
    const closeToast = () => {
        setErrorMessage("");
        setSuccessMessage("");
    }
    return (
        <main className="h-dvh flex justify-center items-center">
            <title>Connexion</title>
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-3xl text-custom_red">Connexion</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <form autoComplete="off"
                          className="flex flex-col items-center gap-5 bg-white p-14 mobile:p-10 rounded-[calc(1rem-1px)]"
                          onSubmit={formHandler}>
                        <CustomInput type="text" name="username" labelText="Nom d'utilisateur" error={errors.username}
                                     onChange={onChange}
                                     value={formData.username}/>
                        <CustomInput type="password" name="password" labelText="Mot de passe" value={formData.password}
                                     onChange={onChange} error={errors.password}/>
                        <input type="submit" value="Connexion"
                               className="bg-custom_orange text-white text-lg p-3 rounded-2xl cursor-pointer"/>
                        <p className="text-lg">Pas de compte ? <Link href="/register"><span
                            className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E]">Inscription</span></Link>
                        </p>
                    </form>
                </div>
            </div>
            <div className="absolute bottom-0 right-10">
                <Toast_error error_message={errorMessage} closeToast={closeToast}/>
                <Toast_success success_message={successMessage} closeToast={closeToast}/>
            </div>
        </main>
    )
}

import {CustomInput} from "@/components/input";
import Link from "next/link";
import {Toast_error} from "@/components/toast_error";
import {Toast_success} from "@/components/toast_success";
