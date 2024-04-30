// CreateComputerModal.js
import React from 'react';
import { CreateComputerForm } from "./../atoms/CreateComputerForm";
import PropTypes from "prop-types";

export const CreateComputerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Equipo</h2>
        <CreateComputerForm onClose={onClose} />
      </div>
    </div>
  );
};

CreateComputerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,  // Asegúrate de que onClose es de tipo func
};
