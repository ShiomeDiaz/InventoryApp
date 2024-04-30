import PropTypes from "prop-types";
import { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { SiGoogletagmanager } from "react-icons/si";
import { ItemMenuSideBar } from "../atoms";

export function MenuItems({ isOpen }) {
  const [route, setRoute] = useState("");

  return (
    <ul className="pt-8">
      <ItemMenuSideBar
        name="Dashboard"
        to="/dashboard"
        route={route}
        isOpen={isOpen}
        icon={<BiSolidDashboard size={24} />}
        onClick={() => setRoute("Dashboard")}
      />
      <ItemMenuSideBar
        name="Gestion"
        to="/inventary"
        route={route}
        isOpen={isOpen}
        icon={<SiGoogletagmanager size={24} />}
        onClick={() => setRoute("Inventary")}
      />
      <ItemMenuSideBar
        name="Enviar"
        to="/"
        route={route}
        isOpen={isOpen}
        icon={<BiSolidDashboard size={24} />}
        onClick={() => setRoute("Home")}
      />
      <ItemMenuSideBar
        name="Recibir"
        to="/"
        route={route}
        isOpen={isOpen}
        icon={<BiSolidDashboard size={24} />}
        onClick={() => setRoute("Home")}
      />
    </ul>
  );
}

MenuItems.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};