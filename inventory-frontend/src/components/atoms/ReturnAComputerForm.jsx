import React from 'react';
import PropTypes from 'prop-types';
//import { returnComputer } from '../../services/endpoints/Endpoint.returncomputer'; // Supongamos que tienes este endpoint

export const ReturnAComputerForm = ({ computerData, onClose, onSuccess }) => {
  const handleReturnSubmit = async () => {
    // Lógica para retornar el equipo
    const data = {
      ComputerID: computerData.ID,
    };

    try {
      await returnComputer(data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al retornar el computador:', error);
    }
  };

  const handlePrintAct = () => {
    // Lógica para imprimir el acta de retorno
    console.log('Imprimir acta de retorno');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button 
          type="button" 
          onClick={handleReturnSubmit} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Aceptar
        </button>
        <button 
          type="button" 
          onClick={handlePrintAct} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Imprimir Acta de Retorno
        </button>
      </div>
    </div>
  );
};

ReturnAComputerForm.propTypes = {
  computerData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
