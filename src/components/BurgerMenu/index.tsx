'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import BorderGradient from "../ui/BorderGradient";
import Category from "@/app/category/page";

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {

    const navLinks = document.querySelectorAll('.navLinks');

    navLinks.forEach(link => {
      link.addEventListener('mouseleave', function () {
        link.classList.add('delay-300');

        setTimeout(() => {
          link.classList.remove('delay-300');
        }, 500);
      });
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };
  return (
    <>
      {/* Menu Burger */}
      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-or focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen ? 'true' : 'false'}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Menu déroulant */}
      <div className={`lg:hidden flex flex-col gap-16 pt-16 pb-[100%] items-center justify-center absolute top-full right-0  w-full text-center rounded-md bg-white z-10 ${menuOpen ? 'block' : 'hidden'}`}>
        <BorderGradient>
          <a href="#home" className="block">
            <span className="font-Luciole_Regular text-xl">
              Connexion/Déconnexion
            </span>
          </a>
        </BorderGradient>
        <BorderGradient>
          <a href="#skills" className="text-[20px]  font-Luciole_Regular ">
            Panier
          </a>
          <Image src="/Images/logo-panier.png" alt="logo_panier" width={50} height={50} className="h-5 w-auto" />
        </BorderGradient>
        <Category />
      </div>
    </>
  )
}

export default BurgerMenu;