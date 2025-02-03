// RentAComputerModal.js
import React from 'react';
import PropTypes from 'prop-types';
import { RentAComputerForm } from '../atoms';
import { ReturnAComputerForm } from '../atoms/ReturnAComputerForm';

export const ReturnAComputerModal = ({ isOpen, onClose, computer, onSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
        <h2 className="text-xl font-bold mb-4">Deseas retornar el equipo? : {computer?.Reference}</h2>
        {/* Asegúrate de que computerData no esté vacío */}
        <ReturnAComputerForm 
          computerData={computer || {}} 
          onClose={onClose} 
          onSuccess={onSuccess} 
        />
      </div>
    </div>
  );
};

ReturnAComputerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  computer: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
