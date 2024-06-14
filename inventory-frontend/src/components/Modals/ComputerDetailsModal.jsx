import React from 'react';
import PropTypes from "prop-types";

export const ComputerDetailsModal = ({ isOpen, onClose, computer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
        <h2 className="text-xl font-bold mb-4">Detalles del Computador</h2>
        {computer && (
          <div className="space-y-2">
            <div><strong>Identificador AF:</strong> {computer.CompanyID}</div>
            <div><strong>Tipo:</strong> {computer.Type}</div>
            <div><strong>Marca:</strong> {computer.Brand}</div>
            <div><strong>Modelo:</strong> {computer.Reference}</div>
            <div><strong>Procesador:</strong> {computer.Processor}</div>
            <div><strong>RAM:</strong> {computer.RAM} GB</div>
            <div><strong>Almacenamiento:</strong> {computer.Storage} GB</div>
            <div><strong>Tarjeta Gráfica:</strong> {computer.GPU}</div>
            <div><strong>Batería:</strong> {computer.Battery}</div>
            <div><strong>Estado Actual:</strong> {computer.Status}</div>
            <div><strong>Propietario:</strong> {computer.Property}</div>
            <div><strong>Fecha de Adquisición:</strong> {computer.PurchaseDate}</div>
            <div><strong>WiFi?:</strong> {computer.HasWifi ? "Sí" : "No"}</div>
            <div><strong>Bluetooth?:</strong> {computer.HasBluetooth ? "Sí" : "No"}</div>
            <div><strong>Ethernet?:</strong> {computer.HasEthernet ? "Sí" : "No"}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Definición de PropTypes para asegurar la integridad de los datos
ComputerDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    computer: PropTypes.object
  };
