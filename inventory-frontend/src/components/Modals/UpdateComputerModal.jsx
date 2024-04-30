import React from 'react';
import PropTypes from "prop-types";
import {UpdateComputerForm} from "./../atoms"

export const UpdateComputerModal = ({ isOpen, onClose, computerData }) => {
  if (!isOpen) return null;

  if (!computerData) {
    // Renderiza nada o un mensaje/loading state apropiado
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
          <p>Cargando datos del equipo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
        <h2 className="text-xl font-bold mb-4">Actualizar Equipo: {computerData.CompanyID}</h2>
        <UpdateComputerForm computerData={computerData} onClose={onClose} />
      </div>
    </div>
  );
};

UpdateComputerModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    computerData: PropTypes.object.isRequired
};
