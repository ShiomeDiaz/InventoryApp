import PropTypes from "prop-types";
import React, { forwardRef } from 'react';
import { NavLink } from "react-router-dom";

export const ItemMenuSideBar = forwardRef(({ name, to, route, isOpen, icon, onClick }, ref) => {
  return (
    <li
      className={`text-white text-md font-semibold flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-3 ${
        route === name && "bg-light-white"
      }`}
    >
      <NavLink to={to} onClick={onClick}>
        {icon}
      </NavLink>
      <NavLink
        className={`${
          !isOpen && "hidden"
        } pl-3 origin-left duration-300 w-full`}
        to={to}
        onClick={onClick}
      >
        {name}
      </NavLink>
    </li>
  );
});
ItemMenuSideBar.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};