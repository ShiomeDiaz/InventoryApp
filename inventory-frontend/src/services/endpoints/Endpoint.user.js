import axios from 'axios';

export async function EndpointUsers() {
  try {
    const response = await axios.get("http://localhost:3000/users");
    return response.data;
  } catch (error) {
    throw new Error("Ups! Tenemos un error, disculpa las molestias");
  }
}
