import PropTypes from "prop-types";
import React, { forwardRef, useState} from 'react';
import { BiSolidDashboard } from "react-icons/bi";
import { SiGoogletagmanager } from "react-icons/si";
import { MdSendTimeExtension } from "react-icons/md";
import { FaHouseLaptop } from "react-icons/fa6";
import { IoGitCompare } from "react-icons/io5";
import { ItemMenuSideBar } from "../atoms";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
export const MenuItems = forwardRef(({ isOpen }, ref) => {
  const [route, setRoute] = useState("");

  return (
    <ul className="pt-8">

    <Tippy content="Dashboard">
      <ItemMenuSideBar
        name="Dashboard"
        to="/dashboard"
        route={route}
        isOpen={isOpen}
        icon={<BiSolidDashboard size={24} />}
        onClick={() => setRoute("Dashboard")}
      />
      </Tippy>
      <Tippy content="Inventario">
      <ItemMenuSideBar
        name="Inventario"
        to="/inventary"
        route={route}
        isOpen={isOpen}
        icon={<SiGoogletagmanager size={24} />}
        onClick={() => setRoute("Inventary")}
      />
            </Tippy>
            <Tippy content="Dashboard">
      <ItemMenuSideBar
        name="Envio"
        to="/shipment"
        route={route}
        isOpen={isOpen}
        icon={<MdSendTimeExtension size={24} />}
        onClick={() => setRoute("ShipmentComputers")}
      />
            </Tippy>
       <Tippy content="Dashboard">
      <ItemMenuSideBar
        name="Devolucion"
        to="/return"
        route={route}
        isOpen={isOpen}
        icon={<FaHouseLaptop size={24} />}
        onClick={() => setRoute("ReturnComputers")}
      />
      </Tippy>
      <Tippy content="Dashboard">
      <ItemMenuSideBar
        name="Empresas"
        to="/company"
        route={route}
        isOpen={isOpen}
        icon={<IoGitCompare size={24} />}
        onClick={() => setRoute("Company")}
      />
      </Tippy>
      
    </ul>
  );
});

MenuItems.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};