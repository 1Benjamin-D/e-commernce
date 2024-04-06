'use client'
import React, {FormEvent, useState} from "react";
import {CustomInput} from "@/components/input";
import Link from "next/link";
import {Toast_error} from "@/components/toast_error";
import Image from "next/image";
import {Toast_success} from "@/components/toast_success";

interface Form {
    username: string
    email: string
    password: string
    confirm_password: string
    numero_phone: string
}

export default function Page() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        numero_phone: ""
    })
    const [errors, setErrors] = useState<Form>({
        confirm_password: "",
        email: "",
        numero_phone: "",
        password: "",
        username: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const onChange = (e: { target: HTMLInputElement }) => {
        setFormData({...formData, [e.target.name]: e.target.value})
        setErrors({...errors, [e.target.name]: ""})
    }
    const validateForm = () => {
        const {username, email, password, confirm_password, numero_phone} = formData;
        // @ts-ignore
        const newErrors: {
            username: string
            email: string
            password: string
            confirm_password: string
            numero_phone: string
        } = {};
        if (username.indexOf(" ") >= 0) {
            newErrors.username = "Le nom d'utilisateur ne peut pas contenir d'espace."
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "L'email n'est pas dans un format valide."
        }
        if (password.indexOf(" ") >= 0) {
            newErrors.password = "Le mot de passe ne peut pas contenir d'espace."
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins un caractere spécial."
        }
        if (!/[A-Z]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une majuscule."
        }
        if (!/[a-z]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins une minuscule."
        }
        if (!/[0-9]/.test(password)) {
            newErrors.password = "Le mot de passe doit contenir au moins un chiffre."
        }
        if (password !== confirm_password) {
            newErrors.confirm_password = "Le mot de passe et le mot de passe de confirmation ne sont pas identique."
        }
        const regex = new RegExp('^0[1-6]{1}(([0-9]{2}){4})|((\\s[0-9]{2}){4})|((-[0-9]{2}){4})$')
        if (!regex.test(numero_phone)) {
            newErrors.numero_phone = "Le numéro de téléphone n'est pas valide."
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const formHandler = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(formData)
                })
                const data = await response.json();
                if (data.success) {
                    setSuccessMessage('Votre compte a été créé avec succès.')
                } else {
                    setErrorMessage(data.message)
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi du formulaire :", error)
            }
        }
    }
    const closeToast = () => {
        setErrorMessage("");
        setSuccessMessage("");
    }
    const clickHandler = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const target = e.target as HTMLImageElement;
        if (target.alt === 'show-password') {
            setShowPassword(!showPassword);
        } else if (target.alt === 'show-confirm_password') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };
    return (
        <main className="relative h-dvh flex justify-center items-center">
            <title>Inscription</title>
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-3xl text-custom_red">Inscription</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <form onSubmit={formHandler}
                          className="flex flex-col items-center gap-5 bg-white p-10 rounded-[calc(1rem-1px)]">
                        <CustomInput labelText="Nom d'utilisateur" name="username" type="text" onChange={onChange}
                                     value={formData.username} error={errors.username}/>
                        <CustomInput labelText="Email" name="email" type="email" onChange={onChange}
                                     value={formData.email} error={errors.email}/>
                        <CustomInput labelText="Numéro de téléphone" name="numero_phone" type="tel" onChange={onChange}
                                     value={formData.numero_phone} error={errors.numero_phone}/>
                        <div className="relative">
                            <CustomInput labelText="Mot de passe" name="password"
                                         type={`${!showPassword ? 'password' : 'text'}`} onChange={onChange}
                                         value={formData.password} error={errors.password}/>
                            <Image alt="show-password"
                                   src={`${!showPassword ? '../images/eye.svg' : '../images/eye-slash.svg'}`}
                                   width="100" height="0"
                                   className="absolute h-7 w-auto top-[51px] right-8 cursor-pointer"
                                   onClick={clickHandler}></Image>
                        </div>
                        <div className="relative">
                            <CustomInput labelText="Confirmation du mot de passe" name="confirm_password"
                                         type={`${!showConfirmPassword ? 'password' : 'text'}`}
                                         onChange={onChange} value={formData.confirm_password}
                                         error={errors.confirm_password}/>
                            <Image alt="show-confirm_password"
                                   src={`${!showConfirmPassword ? '../images/eye.svg' : '../images/eye-slash.svg'}`}
                                   width="100" height="0"
                                   className="absolute h-7 w-auto top-[51px] right-[60px] cursor-pointer" priority
                                   onClick={clickHandler}></Image>
                        </div>
                        <input type="submit" value="Inscription"
                               className="bg-custom_orange text-white text-lg p-3 rounded-2xl cursor-pointer"/>
                        <p className="text-lg">Déjà inscrit ? <Link href="/login"><span
                            className="bg-clip-text border-b border-b-orange-300 text-transparent bg-gradient-to-b from-[#FF5863] via-[#FD8F50] to-[#FFC53E]">Connexion</span></Link>
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