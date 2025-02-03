import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createCompanyComputer } from '../../services/endpoints/Endpoint.rentcomputer'; // Supongamos que tienes este endpoint
import { fetchCompanies } from '../../services/endpoints/Endpoint.company'; // Reutiliza el método fetchCompanies

export const RentAComputerForm = ({ computerData, onClose, onSuccess }) => {
  const [computer, setComputer] = useState({});
  const [companies, setCompanies] = useState([]); // Estado para las compañías
  const [selectedCompany, setSelectedCompany] = useState('');

  // Efecto para cargar los datos iniciales del computador y las compañías
  useEffect(() => {
    if (computerData) {
      setComputer(computerData);
    }

    // Usa el mismo método de fetchCompanies para obtener las compañías
    fetchCompanies()
      .then(setCompanies)
      .catch(error => console.error('Error al obtener las compañías:', error));
  }, [computerData]);

  // Manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComputer(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Manejar el cambio en la selección de compañía
  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar los datos que se enviarán
    const data = {
      ComputerID: computer.ID, // ID del computador seleccionado
      CompanyID: selectedCompany, // ID de la compañía seleccionada
    };

    try {
      // Llamar al endpoint con los datos correctos
      await createCompanyComputer(data); // Llama al endpoint para registrar la asignación
      onSuccess(); // Actualiza la lista de computadores o ejecuta cualquier acción de éxito
      onClose();   // Cierra el modal
    } catch (error) {
      console.error('Error al registrar el computador:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          {/* Campo de selección de la empresa */}
          <label htmlFor="CompanyID" className="block text-sm font-medium text-gray-700">Empresa</label>
          <select
            name="CompanyID"
            id="CompanyID"
            value={selectedCompany}
            onChange={handleCompanyChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="" disabled>Seleccione una empresa</option>
            {companies.map(company => (
              <option key={company.ID} value={company.ID}>
                {company.Name} {/* Mostrar solo el nombre de la compañía */}
              </option>
            ))}
          </select>
        </div>

        {/* Otros campos adicionales del computador */}
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
            value={computer.RAM || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          <label htmlFor="Storage" className="block text-sm font-medium text-gray-700">Almacenamiento (GB)</label>
          <input
            type="number"
            name="Storage"
            id="Storage"
            value={computer.Storage || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Registrar Computador
      </button>
    </form>
  );
};

RentAComputerForm.propTypes = {
  computerData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
