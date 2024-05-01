// CreateComputerModal.js
import React from 'react';
import { CreateCompanyForm } from "./../atoms";
import PropTypes from "prop-types";

export const CreateCompanyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-3xl">
            <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
            <h2 className="text-xl font-bold mb-4">Crear Nueva Empresa</h2>
            <CreateCompanyForm onClose={onClose} />
      </div>
        </div>
  );
};

CreateCompanyModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,  // Asegúrate de que onClose es de tipo func
};

