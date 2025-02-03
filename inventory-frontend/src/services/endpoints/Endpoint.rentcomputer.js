import axios from 'axios';

// URL base para las peticiones de asignaciones de computadoras a empresas
const baseUrl = 'http://localhost:3000/companycomputers';

// Función para obtener todas las asignaciones
export async function fetchCompanyComputers() {
  try {
    const response = await axios.get(baseUrl);
    return response.data; // Retorna los datos de las asignaciones
  } catch (error) {
    throw new Error("Error al recuperar las asignaciones, disculpa las molestias");
  }
}

// Función para obtener una asignación específica por ID
export const fetchCompanyComputerById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;  // Retorna los datos de la asignación específica
  } catch (error) {
    throw new Error("Error al recuperar la asignación específica, intenta nuevamente");
  }
};

// Función para eliminar una asignación
export const deleteCompanyComputer = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.status === 200;  // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error deleting company computer:', error);
    throw new Error("Error al eliminar la asignación, intenta nuevamente");
  }
};

// Función para actualizar una asignación existente
export const updateCompanyComputer = async (id, updatedAssignmentData) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedAssignmentData);
    return response.data; // Retorna la respuesta del servidor, usualmente el objeto actualizado
  } catch (error) {
    console.error('Error updating company computer:', error);
    throw new Error("No se pudo actualizar la asignación, por favor verifica los datos e intenta nuevamente");
  }
};

// Función para crear una nueva asignación (rentar un computador a una empresa)
export const createCompanyComputer = async (assignmentData) => {
  try {
    const response = await axios.post(baseUrl, assignmentData);  // Envía datos de la asignación
    console.log(assignmentData)
    return response.data;  // Retorna la respuesta del servidor, usualmente el objeto creado
    
  } catch (error) {
    console.error('Error creating company computer:', error);
    throw new Error("No se pudo crear la asignación, por favor verifica los datos e intenta nuevamente");
  }
};
