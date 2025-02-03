import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateCompany } from "./../../services"; // Importa la función de actualización
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateCompanyForm = ({ companyData, onClose, onSuccess }) => {
  const [company, setCompany] = useState({});

  useEffect(() => {
    setCompany(companyData || {});
  }, [companyData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCompany(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        NIT: company.NIT,
        Name: company.Name,
        Address: company.Address,
        City: company.City,
        Country: company.Country,
        Phone: company.Phone,
        Email: company.Email,
        Website: company.Website,
        PostalCode : company.PostalCode
    };
    console.log(data);

    try {
        await updateCompany(company.ID, data);
        toast.success('Empresa actualizada con éxito.');
        onSuccess();
        setTimeout(onClose, 5000); 
    } catch (error) {
        console.error('Error al actualizar la Empresa:', error);
        toast.error('Error al actualizar la Empresa.');
    }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label htmlFor="NIT" className="block text-sm font-medium text-gray-700">NIT</label>
          <input
            type="text"
            name="NIT"
            id="NIT"
            value={company.NIT || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="Email"
            id="Email"
            value={company.Email || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

        <label htmlFor="PostalCode" className="block text-sm font-medium text-gray-700">Codigo Postal</label>
          <input
            type="text"
            name="PostalCode"
            id="PostalCode"
            value={company.PostalCode || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

      </div>

        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label htmlFor="Name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="Name"
            id="Name"
            value={company.Name || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        <label htmlFor="Website" className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            name="Website"
            id="Website"
            value={company.Website || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

        <label htmlFor="City" className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input
            type="text"
            name="City"
            id="City"
            value={company.City || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label htmlFor="Phone" className="block text-sm font-medium text-gray-700">Telefono</label>
          <input
            type="text"
            name="Phone"
            id="Phone"
            value={company.Phone || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Direccion</label>
          <input
            type="text"
            name="Address"
            id="Address"
            value={company.Address || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

        <label htmlFor="Country" className="block text-sm font-medium text-gray-700">Pais</label>
          <input
            type="text"
            name="Country"
            id="Country"
            value={company.Country || ''}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />

        </div>
        </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Actualizar Empresa
      </button>
    </form>
  );
};

UpdateCompanyForm.propTypes = {
  companyData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
