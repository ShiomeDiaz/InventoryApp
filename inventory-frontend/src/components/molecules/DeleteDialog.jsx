import React from 'react';
import PropTypes from "prop-types";

export const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl">
        <div className="p-5 border-b">
          <h3 className=" text-center font-semibold text-3xl text-gray-800">Confirmar eliminación</h3>
        </div>
        <div className="p-5">
          <p className="text-m text-gray-600">
            ¿Estás seguro de que deseas eliminar este elemento?
          </p>
          <p className="text-m text-gray-600">
             Esta acción no se puede deshacer.
          </p>
        </div>
        <div className="flex justify-end p-5 border-t">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 mr-0.5 font-semibold py-2 px-4 rounded-l"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-light-red hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-r"
            onClick={onConfirm}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };
