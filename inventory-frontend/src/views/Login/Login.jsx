import { useState } from "react";
import { Form, Formik } from "formik";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { initialValues, validationSchema } from "./Login.data";
import { FormField } from "../../components/atoms";
import axios from 'axios'; // Asegúrate de tener axios instalado
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { Stock } from "../../assets";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorCredentials, setErrorCredentials] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    axios.post('http://localhost:3000/login', {
        username: values.username,
        password: values.password
    })
    .then(response => {
        if(response.data.token) {
            login(response.data.token);
            navigate("/dashboard");
        } else {
            setErrorCredentials(true);
        }
    })
    .catch(error => {
        console.error('Error durante el inicio de sesión:', error);
        setErrorCredentials(true);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-blue">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
          <Form className="w-full max-w-sm flex flex-col items-center bg-white rounded-lg py-10 px-10 shadow-md">
            <div className="w-full p-4 text-center">
              <img
                className="w-full mx-auto cursor-pointer"
                src={Stock}
                alt="Logo Capto"
              />
            </div>
            <div className="w-full mx-4">
              <FormField
                label="Nombre de usuario"
                forName="username"
                typeField="text"
                labelClass="block text-gray-700 text-sm font-bold mb-2"
                fieldClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                errorClass="text-red-500 text-xs italic"
              />
              <div className="relative my-4">
                <FormField
                  label="Contraseña"
                  forName="password"
                  typeField={showPassword ? "text" : "password"}
                  labelClass="block text-gray-700 text-sm font-bold mb-2"
                  fieldClass="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  errorClass="text-red-500 text-xs italic"
               />
                <button
                  type="button"
                  className="absolute right-2 top-9 text-gray-700 font-bold p-0.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEyeSlash size={22} /> : <BsEye size={22} />}
                </button>
              </div>
              {errorCredentials && (
                <div className="text-red-500 text-xs italic">Credenciales incorrectas.</div>
              )}
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Iniciar sesión
              </button>
            </div>
          </Form>
      </Formik>
    </div>
  );
}
