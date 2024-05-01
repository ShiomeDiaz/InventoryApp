import axios from 'axios';

// URL base para las peticiones de empresas
const baseUrl = 'http://localhost:3000/companies';

// Función para obtener todas las empresas
export async function fetchCompanies() {
  try {
    const response = await axios.get(baseUrl);
    return response.data; // Retorna los datos de las empresas
  } catch (error) {
    throw new Error("Ups! Tenemos un error al recuperar las empresas, disculpa las molestias");
  }
}

// Función para eliminar una empresa
export const deleteCompany = async (companyId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${companyId}`);
    return response.status === 200;  // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error deleting company:', error);
    throw error;  // Propaga el error
  }
};

// Función para actualizar una empresa existente
export const updateCompany = async (companyId, updatedCompanyData) => {
  try {
    const response = await axios.put(`${baseUrl}/${companyId}`, updatedCompanyData);
    return response.data; // Retorna la respuesta del servidor, usualmente el objeto actualizado
  } catch (error) {
    console.error('Error updating company:', error);
    throw new Error("No se pudo actualizar la empresa, por favor verifica los datos e intenta nuevamente");
  }
};

// Función para crear una nueva empresa
export const createCompany = async (companyData) => {
  try {
    const response = await axios.post(baseUrl, companyData);  // Envía datos de la empresa
    return response.data;  // Retorna la respuesta del servidor, usualmente el objeto creado
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error("No se pudo crear la empresa, por favor verifica los datos e intenta nuevamente");
  }
};
