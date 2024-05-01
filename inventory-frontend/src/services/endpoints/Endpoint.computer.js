import axios from 'axios';

const baseUrl = 'http://localhost:3000/computers';

export async function fetchComputer() {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error("Ups! Tenemos un error, disculpa las molestias");
  }
}
export const deleteComputer = async (computerId) => {
  try {
    const response = await axios.delete(`${baseUrl}/${computerId}`);
    return response.status === 200;  // Return true if the delete was successful
  } catch (error) {
    console.error('Error deleting computer:', error);
    throw error;  // Propagate error
  }
};

// Función para actualizar un computador existente
export const updateComputer = async (computerId, updatedComputerData) => {
  try {
    const response = await axios.put(`${baseUrl}/${computerId}`, updatedComputerData);
    return response.data; // Retorna la respuesta del servidor, usualmente el objeto actualizado
  } catch (error) {
    console.error('Error updating computer:', error);
    throw new Error("No se pudo actualizar el computador, por favor verifica los datos e intenta nuevamente");
  }
};

// Función para crear un nuevo computador
export const createComputer = async (computerData) => {
  try {
    const response = await axios.post(baseUrl, computerData);  // Envía datos del computador
    return response.data;  // Retorna la respuesta del servidor, usualmente el objeto creado
  } catch (error) {
    console.error('Error creating computer:', error);
    throw new Error("No se pudo crear el computador, por favor verifica los datos e intenta nuevamente");
  }
};
