import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MenuItems } from "../molecules/MenuItems";
import { useAuth } from "../../context";

import { BsBox } from "react-icons/bs";

import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    if (isSmallScreen) {
      setIsOpen(false);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSmallScreen, setIsSmallScreen]);

  return (
    <div
      className={` ${
        !isOpen ? "w-72" : "w-20 "
      } bg-dark-purple -screen p-5 pt-8 relative duration-300 font-bold py-2 px-4 shadow-md `}
    >
      <MdKeyboardDoubleArrowRight
        className={`bg-white text-dark-purple
        rounded-full absolute -right-3 top-9 border font-bold cursor-pointer ${!isOpen ? "rotate-180 duration-300" : "duration-300"}`}
        onClick={toggleMenu}
        size={28}
      />

      <div className="flex flex-col items-center justify-center">
        <BsBox className={`text-white bg-dark-purple text-5xl 
        rounded cursor-pointer block float-left mr-2 duration-500 ${!isOpen&& "rotate-[360deg]"}`}/>
        <h1 className={`text-white origin-top font-roboto mt-1 text-3xl duration-500 ${isOpen && "scale-0"}`} >INVENTORY</h1>
      </div>
      <MenuItems isOpen={!isOpen} />
      <div className="text-white w-[90%] text-md font-semibold flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-3 mb-3 absolute bottom-10 ">
        <Tippy content="Cerrar Sesión">
          <button
            className="text-white w-full border-none rounded flex items-center "
            onClick={() => {
              logout();
            }}
          >
            <FaSignOutAlt size={25} className="mr-2" />
            <p className="pl-1 origin-left ml-2" >{!isOpen ? "Logout" : ""}</p>
            
          </button>
        </Tippy>
      </div>
    </div>
  );
}
