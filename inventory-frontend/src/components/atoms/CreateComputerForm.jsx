import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {createComputer} from "./../../services"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateComputerForm = ({ onClose }) => {
  const [computer, setComputer] = useState({
    Type: '',
    Brand: '',
    Reference: '',
    Processor: '',
    RAM: '',
    Storage: '',
    HasEthernet: false,
    HasWifi: false,
    HasBluetooth: false,
    GPU: '',
    Battery: '',
    PurchaseDate: '',
    Status: 'Bodega',
    CompanyID: ''
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    let updatedValue = type === 'checkbox' ? checked : value;
  
    if (name === 'CompanyID') {
      if (updatedValue.startsWith("AF")) {
        updatedValue = updatedValue; // Si ya tiene AF, mantenlo como está
      } else if (!updatedValue.startsWith("AF") && updatedValue !== '') {
        updatedValue = `AF${updatedValue.replace(/\D/g, '')}`; // Añadir AF y eliminar cualquier no-dígito
      } else {
        updatedValue = ''; // Mantener vacío si intenta eliminar todo
      }
      const pattern = /^AF\d{0,5}$/;
      if (pattern.test(updatedValue) || updatedValue === '') {
        setComputer(prev => ({
          ...prev,
          [name]: updatedValue
        }));
      }
    } else if (type === 'number') {
      updatedValue = updatedValue ? parseInt(updatedValue, 10) : '';
      setComputer(prev => ({
        ...prev,
        [name]: updatedValue
      }));
    } else {
      setComputer(prev => ({
        ...prev,
        [name]: updatedValue
      }));
    }
  };
  
  
  
  // New handler to block non-numeric keys
  const handleKeyDown = (e) => {
    // Allow only backspace, tab, end, home, arrow keys, and numbers
    if (!["Backspace", "Tab", "End", "Home", "ArrowLeft", "ArrowRight"].includes(e.key) && (e.key < '0' || e.key > '9')) {
      e.preventDefault();
    }
  };
  
  
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComputer = await createComputer(computer);
      console.log('Nuevo computador creado:', newComputer);
      toast.success('Computador creado con éxito.');
      setTimeout(onClose, 5000);  // Retrasa onClose para dar tiempo al toast para que se muestre
    } catch (error) {
      console.error('Error al crear el computador:', error);
      toast.error('Error al crear el computador: ' + error.message);
    }
  };
  



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex flex-wrap -mx-3">
        {/* Column 1 */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label htmlFor="Reference" className="block text-sm font-medium text-gray-700">Identificador AF</label>
        <input
    type="text"
    name="CompanyID"
    id="CompanyID"
    value={computer.CompanyID}
    onChange={handleChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    placeholder="AF1234"
  />
  {/* Dropdown for Type */}
  <label htmlFor="Type" className="block text-sm font-medium text-gray-700">Tipo</label>
  <select
    name="Type"
    id="Type"
    value={computer.Type}
    onChange={handleChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    required
  >
    <option value=""disabled></option>
    <option value="Laptop">Laptop</option>
    <option value="Desktop">Desktop</option>
    <option value="Server">Server</option>
  </select>

  {/* Input for Brand */}
  <label htmlFor="Brand" className="block text-sm font-medium text-gray-700">Marca</label>
  <input
    type="text"
    name="Brand"
    id="Brand"
    value={computer.Brand}
    onChange={handleChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />

  {/* Input for Reference */}
  <label htmlFor="Reference" className="block text-sm font-medium text-gray-700">Modelo</label>
  <input
    type="text"
    name="Reference"
    id="Reference"
    value={computer.Reference}
    onChange={handleChange}
    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  />
            <label htmlFor="HasEthernet" className="block text-sm font-medium text-gray-700 mr-2"> Ethernet? </label>
        <input type="checkbox" name="HasEthernet" checked={computer.HasEthernet} onChange={handleChange}/>
          
</div>


        {/* Column 2 */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label htmlFor="Processor" className="block text-sm font-medium text-gray-700">Procesador</label>
          <input type="text" name="Processor" id="Processor" value={computer.Processor} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          
          <label htmlFor="RAM" className="block text-sm font-medium text-gray-700">RAM (GB)</label>
          <input type="number" name="RAM" id="RAM"   min="0" onKeyDown={handleKeyDown} value={computer.RAM} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          
          <label htmlFor="Storage" className="block text-sm font-medium text-gray-700">Almacenamiento (GB)</label>
          <input type="number" name="Storage" id="Storage"   min="0" onKeyDown={handleKeyDown}   value={computer.Storage} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          <label htmlFor="HasWifi" className="block text-sm font-medium text-gray-700 mr-2">WiFi?</label>
          <input type="checkbox" name="HasWifi" checked={computer.HasWifi} onChange={handleChange} />
            
        </div>

        {/* Column 3 */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label htmlFor="GPU" className="block text-sm font-medium text-gray-700">GPU</label>
          <input type="text" name="GPU" id="GPU" value={computer.GPU} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />

          <label htmlFor="Battery" className="block text-sm font-medium text-gray-700">Bateria %</label>
          <input type="text" name="Battery" id="Battery" value={computer.Battery} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          <label htmlFor="GPU" className="block text-sm font-medium text-gray-700">Fecha de Adquisición</label>
          <input
  type="date"
  name="PurchaseDate"
  id="PurchaseDate"
  value={computer.PurchaseDate}
  onChange={handleChange}
  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
  max={new Date().toISOString().split("T")[0]} // Establece el máximo como hoy
/>

          <label htmlFor="HasBluetooth" className="block text-sm font-medium text-gray-700 mr-2">Bluetooth?</label>
          <input type="checkbox" name="HasBluetooth" checked={computer.HasBluetooth} onChange={handleChange} />
            
        </div>
      
      </div>
      <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded">
        Crear Computador
      </button>
    </form>
  );
};

CreateComputerForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
