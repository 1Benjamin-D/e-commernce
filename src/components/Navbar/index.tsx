
import Image from "next/image";
import BurgerMenu from "../BurgerMenu";

export default function Navbar() {


  return (

    <nav className="relative p-4 text-or font-Orienta_Regular">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/Images/logo-ecommernce.png" alt="Logo" className="h-16 w-auto" width={75} height={73} />
        </div>

        {/* Menu */}
        <div className="sm:flex hidden">
          <a href="#home" className="navLinks ease-out transition-colors mx-1 py-2 px-4 rounded-md relative hover:underline">
            Home
          </a>
          <a href="#skills" className="navLinks ease-out transition-colors mx-1 py-2 px-4 rounded-md relative hover:underline">
            Skills
          </a>
          <a href="#projects" className="navLinks ease-out transition-colors mx-1 py-2 px-4 rounded-md relative hover:underline">
            Projects
          </a>
          <a href="#contact" className="navLinks ease-out transition-colors mx-1 py-2 px-4 rounded-md relative hover:underline">
            Contact
          </a>
        </div>
        <BurgerMenu />
      </div>
    </nav>
  )
}
