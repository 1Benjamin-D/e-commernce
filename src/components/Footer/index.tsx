

const Footer = () => {
  return (
    <footer>
      <div className="font-Luciole_Regular flex flex-col text-center items-center bg-[#f8f8f8] mt-[50px] md:flex-row justify-center lg:pl-[60px] m-[-20px]">
        <div className="flex flex-col">
          <a href="" className="mt-[10px]">Accueil</a>
          <a href="" className="mt-[10px]">Catégories</a>
          <a href="" className="mt-[10px]">Tendances</a>
        </div>
        <div className="bg-[#FFD700] w-[310px] h-[6px] mt-[15px] mb-[15px] rounded-full md:rotate-90 md:w-[77px]" />
        <div className="flex flex-col">
          <a href="" className="mt-[10px]">Qui sommes-nous ?</a>
          <a href="" className="mt-[10px]">Contactez-nous</a>
        </div>
        <div className="bg-[#FFD700] w-[310px] h-[6px] mt-[15px] mb-[15px] rounded-full md:rotate-90 md:w-[77px]" />
        <div className="flex flex-col">
          <a href="" className="mt-[10px]">Mentions Légales</a>
          <a href="" className="mt-[10px]">CGV</a>
          <a href="" className="mt-[10px] mb-[10px]">© Copyright</a>
        </div>
      </div>
    </footer>
  )
}
export default Footer;