'use client'
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu";
import { SearchInput } from "../SearchInput";
import BorderGradient from "../ui/BorderGradient";
import { useEffect, useState } from "react";
import { cryptPassword } from "@/utils/bcrypt";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isloading, setIsloading] = useState(true);
  const path = usePathname()
  useEffect(() => {
    const token = async () => {
      try {
        setIsloading(true)
        const user_token = localStorage.getItem('token')
        if (!user_token) {
          setIsLogged(false)
          setIsloading(false)
          return;
        }
        const response = await fetch('/api/validatetoken', {
          method: 'POST',
          headers: {
            'api-key': await cryptPassword(process.env.NEXT_PUBLIC_API_KEY!)
          },
          body: JSON.stringify({ user_token: user_token })
        })
        const data = await response.json();
        if (data.success) {
          setIsLogged(true)
        }
        setIsloading(false)
      }
      catch (error) {
        console.error('Erreur lors de la validation du token :', error)
      }
    }
    token()
  }, [path]);

  return (

    <nav className="relative p-4 text-or font-Orienta_Regular mb-[38px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-6">
          <Link href={"../"}>
            <Image src="/Images/logo-ecommernce.png" alt="Logo" className="h-16 w-auto" width={75} height={73} />
          </Link>
          <div className="hidden lg:ml-[100px] lg:flex md:ml-[20px]">
            <SearchInput />
          </div>
        </div>


        {/* Menu */}
        <div className=" lg:flex hidden font-Luciole_Regular">
          {isloading ? (
            <BorderGradient>
              <span className=" text-base animate-pulse">
                Chargement...
              </span>
            </BorderGradient>
          ) : (
            <div>
              {isLogged ? (
                <Link className="block" href={"/account"}>
                  <BorderGradient>
                    <span className=" text-base">
                      Mon compte
                    </span>
                  </BorderGradient>
                </Link>
              ) : (
                <Link className="block" href={"/login"}>
                  <BorderGradient>
                    <span className=" text-base">
                      Connexion/Déconnexion
                    </span>
                  </BorderGradient>
                </Link>
              )}
            </div>
          )}
          <div className="ml-[24px]">
            <Link href={"/cart"} className="text-base flex items-center">
              <BorderGradient className="px-10">
                <span>Panier</span>
                <Image src="/Images/logo-panier.png" alt="logo_panier" width={500} height={500} className="h-5 w-auto" />
              </BorderGradient>
            </Link>
          </div>
        </div >
        <BurgerMenu />
      </div >
    </nav >
  )
}
