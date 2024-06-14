import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { BsSendArrowUp, BsSendArrowDown } from 'react-icons/bs';

export const RentButton = ({ status, onClick }) => {
  const isBodega = status === 'Bodega';
  const buttonClass = isBodega ? 'text-dark-blue hover:bg-blue-100' : 'text-light-red hover:bg-blue-100';
  const icon = isBodega ? <BsSendArrowUp className="text-2xl" /> : <BsSendArrowDown className="text-2xl" />;
  const tooltipContent = isBodega ? "Rentar" : "Ingreso";

  return (
    <Tippy content={tooltipContent}>
      <button className={`p-1 rounded-full ${buttonClass}`} onClick={onClick}>
        {icon}
      </button>
    </Tippy>
  );
};

