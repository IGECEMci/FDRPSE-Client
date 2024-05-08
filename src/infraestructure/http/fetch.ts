import axios from 'axios';
import { storage } from '../local-storage/localStorage';

/**
 * La configuración esta generada para poder hacer peticiones al servidor y es creado para poder tener una abstración para que en la implementación no depende de la librería axios y pueda ser cambiada sin modificar logica, componentes, etc.
 */

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    responseType: 'json',
})

apiInstance.interceptors.request.use(
    async config => {
        const session = storage.get('session');
        if (typeof session === 'string') config.headers.session = session;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

apiInstance.interceptors.response.use(
    async response => response,
    error => {
        if (window.location.pathname !== "/cuestionario/" && error.request.status === 401) {
            window.location.replace("/cuestionario/")
        }
        return Promise.reject(error);
    }
)

