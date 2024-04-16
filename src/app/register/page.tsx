'use client'
import React, {FormEvent, useEffect, useState} from "react";
import {CustomInput} from "@/components/input";
import Link from "next/link";
import Image from "next/image";
import {cryptPassword} from "@/utils/bcrypt";
import {useRouter} from "next/navigation";
import {validatetoken} from "@/utils/validatetoken";
import Toaster from "@/components/Toaster";

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
    interface ToasterItem {
        content: string;
        type: string;
    }
    const [toasterItems, setToasterItems] = useState<Array<ToasterItem>>([])
    const router = useRouter();
    useEffect(() => {
        if (validatetoken() !== undefined){
            if(!validatetoken()!.expired){
                router.push("/");
            }
        }
    }, [router]);

    useEffect(() => {
        if(toasterItems.length >= 5){
            toasterItems.shift()
        }
    }, [toasterItems, toasterItems.length]);
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
                    headers: {
                        'API-Key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
                    },
                    body: JSON.stringify(formData)
                })
                const data = await response.json();
                type ToasterItem = {
                    type: string;
                    content: string;
                }
                const toasterItem: ToasterItem = {type: data.type, content: data.message};
                setToasterItems(prevToasterItems => [...prevToasterItems, toasterItem]);
            } catch (error) {
                console.error("Erreur lors de l'envoi du formulaire :", error)
            }
        }
    }
    const closeToast = (e: React.MouseEvent<HTMLButtonElement>) => {
        const index = parseInt((e.currentTarget as HTMLElement).closest('div')!.getAttribute('toast_index') as string);
        setToasterItems(prevToasterItems => {
            const updatedToasterItems = [...prevToasterItems];
            updatedToasterItems.splice(index, 1);
            return updatedToasterItems;
        });
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
        <main className="relative h-fit p-10 flex justify-center items-center">
            <title>Inscription</title>
            <div className="flex flex-col justify-center items-center gap-3">
                <p className="text-3xl text-custom_red">Inscription</p>
                <div className="rounded-2xl bg-gradient-to-br from-[#FF5863] via-[#FD8F50] to-[#FFC53E] p-[2px]">
                    <form onSubmit={formHandler}
                          className="flex flex-col items-center gap-3 bg-white p-7 rounded-[calc(1rem-1px)]">
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
                                   className="absolute h-7 w-auto top-[48px] right-12 cursor-pointer"
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
                                   className="absolute h-7 w-auto top-[48px] right-12 cursor-pointer" priority
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
            <div
                className="fixed mobile:w-2/3 mobile:h-fit mobile:top-5 mobile:left-1/2 mobile:transform mobile:-translate-x-1/2 bottom-5 right-5 flex flex-col">
                {toasterItems.map(({content, type}, index): React.JSX.Element => {
                    return (
                        <Toaster key={index}
                                 toast_index={index}
                                 content={content}
                                 type={type}
                                 onClickEvent={closeToast}/>
                    );
                })}
            </div>
        </main>
    )
}