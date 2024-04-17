
import Image from "next/image";
import Link from "next/link";
import BurgerMenu from "../BurgerMenu";
import { SearchInput } from "../SearchInput";
import BorderGradient from "../ui/BorderGradient";

export default function Navbar() {


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
          <div>
            <BorderGradient>
              <a href="/login" className="block">
                <span className=" text-base">
                  Connexion/Déconnexion
                </span>
              </a>
            </BorderGradient>
          </div>
          <div className="ml-[24px]">
            <BorderGradient className="px-10">
              <a href="#" className="text-base flex items-center">
                Panier
                <Image src="/Images/logo-panier.png" alt="logo_panier" width={500} height={500} className="h-5 w-auto" />
              </a>
            </BorderGradient>
          </div>
        </div>
        <BurgerMenu/>
      </div>
    </nav>
  )
}
