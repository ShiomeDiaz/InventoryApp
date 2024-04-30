import * as Yup from "yup";

export const initialValues = {
  username: "",
  password: "",
};

export const validationSchema = Yup.object({
  username: Yup.string()
    .required("El nombre de usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});
