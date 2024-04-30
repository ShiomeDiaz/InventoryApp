import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MenuItems } from "../molecules/MenuItems";
import { useAuth } from "../../context";
import { BsBox, BsArrowRightShort } from "react-icons/bs"


export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      // Verificar si el ancho de la pantalla es menor que 640px
      setIsSmallScreen(window.innerWidth < 640);
    };

    // Suscribirse al evento de cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Llamada inicial para establecer el estado inicial
    handleResize();

    if (isSmallScreen) {
      setIsOpen(false);
    }

    // Desuscribirse del evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen, setIsSmallScreen]);

  return (
    <div
    className={` ${
      !isOpen ? "w-72" : "w-20 "
    } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
  >
        <BsArrowRightShort className={`bg-white text-dark-purple text-3xl 
        rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!isOpen ? "rotate-180 duration-300" : "duration-300"}`}
        onClick={toggleMenu}
        />

      <div className="inline-flex">
           <BsBox className={`text-amber-300 bg-dark-purple text-4xl 
           rounded cursor-pointer block float-left mr-2 duration-500 ${!isOpen&& "rotate-[360deg]"}`}/>
           <h1 className={`text-white origin-left font-medium font-lobster text-3xl duration-500 ${isOpen && "scale-0"}`} >INVENTARY</h1>


         </div>
      <MenuItems isOpen={!isOpen} />

      <div className="text-white text-md font-semibold flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-3 mb-3 absolute bottom-0 ">
        <button
          className="text-white w-full border-none rounded flex items-center justify-center"
          onClick={() => {
            logout();
          }}
        >
          <FaSignOutAlt size={24} className="mr-2" />
          {!isOpen ? "Logout" : ""}
        </button>
      </div>
    </div>
  );
}