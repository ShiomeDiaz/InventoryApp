import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateComputer } from "./../../services"; // Importa la función de actualización
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateComputerForm = ({ computerData, onClose, onSuccess }) => {
  const [computer, setComputer] = useState({});

  useEffect(() => {
    setComputer(computerData || {});
  }, [computerData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComputer(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        Type: computer.Type,
        Brand: computer.Brand,
        Reference: computer.Reference,
        Processor: computer.Processor,
        RAM: Number(computer.RAM),
        Storage: Number(computer.Storage),
        HasEthernet: computer.HasEthernet,
        HasWifi: computer.HasWifi,
        HasBluetooth: computer.HasBluetooth,
        GPU: computer.GPU,
        Battery: computer.Battery,
        PurchaseDate: computer.PurchaseDate,
        Status: computer.Status,
        CompanyID: computer.CompanyID
    };
    console.log(data);

    try {
        await updateComputer(computer.ID, data);
        toast.success('Computador actualizado con éxito.');
        onSuccess();
        setTimeout(onClose, 5000); 
    } catch (error) {
        console.error('Error al actualizar el computador:', error);
        toast.error('Error al actualizar el computador.');
        setTimeout(5000); 
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label htmlFor="Type" className="block text-sm font-medium text-gray-700">Tipo</label>
          <select
            name="Type"
            id="Type"
            value={computer.Type || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Seleccione un tipo</option>
            <option value="Laptop">Laptop</option>
            <option value="Desktop">Desktop</option>
            <option value="Server">Server</option>
          </select>
          <label htmlFor="Brand" className="block text-sm font-medium text-gray-700">Marca</label>
          <input
            type="text"
            name="Brand"
            id="Brand"
            value={computer.Brand || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="Reference" className="block text-sm font-medium text-gray-700">Modelo</label>
          <input
            type="text"
            name="Reference"
            id="Reference"
            value={computer.Reference || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="HasEthernet" className="block text-sm font-medium text-gray-700">Ethernet?</label>
          <input
            type="checkbox"
            name="HasEthernet"
            checked={computer.HasEthernet || false}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label htmlFor="Processor" className="block text-sm font-medium text-gray-700">Procesador</label>
          <input
            type="text"
            name="Processor"
            id="Processor"
            value={computer.Processor || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="RAM" className="block text-sm font-medium text-gray-700">RAM (GB)</label>
          <input
            type="number"
            name="RAM"
            id="RAM"
            value={computer.RAM || 0}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="Storage" className="block text-sm font-medium text-gray-700">Almacenamiento (GB)</label>
          <input
            type="number"
            name="Storage"
            id="Storage"
            value={computer.Storage || 0}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="HasWifi" className="block text-sm font-medium text-gray-700">WiFi?</label>
          <input
            type="checkbox"
            name="HasWifi"
            checked={computer.HasWifi || false}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label htmlFor="GPU" className="block text-sm font-medium text-gray-700">GPU</label>
          <input
            type="text"
            name="GPU"
            id="GPU"
            value={computer.GPU || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="Battery" className="block text-sm font-medium text-gray-700">Batería</label>
          <input
            type="text"
            name="Battery"
            id="Battery"
            value={computer.Battery || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <label htmlFor="HasBluetooth" className="block text-sm font-medium text-gray-700">Bluetooth?</label>
          <input
            type="checkbox"
            name="HasBluetooth"
            checked={computer.HasBluetooth || false}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Actualizar Computador
      </button>
    </form>
  );
};

UpdateComputerForm.propTypes = {
  computerData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
