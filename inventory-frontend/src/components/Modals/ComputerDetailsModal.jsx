import React from 'react';
import PropTypes from "prop-types";

export const ComputerDetailsModal = ({ isOpen, onClose, computer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 relative w-full max-w-3xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-lg font-semibold">&times;</button>
        <h2 className="text-2xl font-bold mb-4">Especificaciones tecnicas</h2>
        {computer && (
          <table className="min-w-full bg-white">
            <tbody>
              {[
                ["Identificador AF", computer.CompanyID],
                ["Tipo", computer.Type],
                ["Marca", computer.Brand],
                ["Modelo", computer.Reference],
                ["Procesador", computer.Processor],
                ["RAM", `${computer.RAM} GB`],
                ["Almacenamiento", `${computer.Storage} GB`],
                ["Tarjeta Gráfica", computer.GPU],
                ["Batería", computer.Battery],
                ["Estado Actual", computer.Status],
                ["Propietario", computer.Property],
                ["Fecha de Adquisición", computer.PurchaseDate],
                ["WiFi?", computer.HasWifi ? "Sí" : "No"],
                ["Bluetooth?", computer.HasBluetooth ? "Sí" : "No"],
                ["Ethernet?", computer.HasEthernet ? "Sí" : "No"],
              ].map(([label, value], index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{label}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
