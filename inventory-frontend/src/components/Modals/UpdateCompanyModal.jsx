import React from 'react';
import PropTypes from "prop-types";
import {UpdateCompanyForm} from "./../atoms"

export const UpdateCompanyModal = ({ isOpen, onClose, companyData }) => {
  if (!isOpen) return null;

  if (!companyData) {
    // Renderiza nada o un mensaje/loading state apropiado
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
          <p>Cargando datos de la empresa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
        <h2 className="text-xl font-bold mb-4">Actualizar Empresa: {companyData.Name}</h2>
        <UpdateCompanyForm companyData={companyData} onClose={onClose} />
      </div>
    </div>
  );
};

UpdateCompanyModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    companyData: PropTypes.object.isRequired
};


