import * as Yup from 'yup';
/**
 * Las validaciones son las encargadas de manejar los erroes y restriciones en los formularios
 */

export const loginValidation = () => ({
    username: Yup.string().required('El campo de usuario es obligatorio'),
    password: Yup.string().min(5, 'La contraseña debe contener al menos 5 caracteres').required('El campo de contraseña es obligatorio'),
});

export const forgotPasswordValidations = () => ({
    email: Yup.string().email('La dirección de correo no es valida').required('El correo es requerido'),
});

// export const changePassword = () => ({
//     password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required('La contraseña es requerida'),
//     confirm_password: Yup.string().required('Confirma la contraseña para continuar').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
// });