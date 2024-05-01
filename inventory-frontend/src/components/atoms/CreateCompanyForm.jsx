import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {createCompany} from "./../../services"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateCompanyForm = ({ onClose }) => {
    const [company, setCompany] = useState({
        nit: '',
        name: '',
        city: '',
        country: '',
        phone: '',
        email: '',
        website: ''
    });

    const handleChange = (e) => {
        setCompany({ ...company, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const newCompany = await createCompany(company);
          console.log('Nueva Empresa creada:', newCompany);
          toast.success('Nueva Empresa creada con éxito.');
          setTimeout(onClose, 5000);  // Retrasa onClose para dar tiempo al toast para que se muestre
        } catch (error) {
          console.error('Error al crear la Empresa:', error);
          toast.error('Error al crear la Empresa: ' + error.message);
        }
      };
      

      return (
                <form onSubmit={handleSubmit} className="space-y-4">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    <div className="flex flex-wrap -mx-3">
                        {/* Columna 1 */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="nit" className="block text-sm font-medium text-gray-700">NIT</label>
                            <input type="text" id="nit" name="nit" value={company.nit} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" id="name" name="name" value={company.name} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Columna 2 */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" value={company.email} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Columna 3 */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                            <input type="text" id="city" name="city" value={company.city} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Columna 4 */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                            <input type="text" id="country" name="country" value={company.country} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Columna 5 */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                            <input type="text" id="phone" name="phone" value={company.phone} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        {/* Columna 6 */}
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label htmlFor="website" className="block text-sm font-medium text-gray-700">Sitio web (opcional)</label>
                            <input type="text" id="website" name="website" value={company.website} onChange={handleChange}
                                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                    <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded">
                        Crear Empresa
                    </button>
                </form>
    );
};

CreateCompanyForm.propTypes = {
    onClose: PropTypes.func.isRequired
};
