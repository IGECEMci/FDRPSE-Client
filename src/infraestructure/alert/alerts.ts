/**
 * Las alertas se encuentran en la infraestructura porque no dependen de la lógica por lo que se genera una abstración para que la implementación
 * no dependa de la funcion de la aplicación.
 */
import { enqueueSnackbar } from 'notistack';


const basicConfig: any = { anchorOrigin: { vertical: "top", horizontal: "center" },   preventDuplicate: true }


export const succesAlert = (message: string) => enqueueSnackbar(message, { variant: "success", ...basicConfig });
export const errorAlert = (message = 'Parece que hubo un error - Intenta más tarde') => enqueueSnackbar(message, { variant: "error", ...basicConfig });
export const warningAlert = (message = 'Parece que hubo un error - Intenta más tarde') => enqueueSnackbar(message, { variant: "warning", ...basicConfig });