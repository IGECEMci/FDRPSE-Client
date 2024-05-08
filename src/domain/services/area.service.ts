import { useContext } from 'react';
import { AreaContext } from '../../infraestructure/context/area';
import { areaRepository } from '../../infraestructure/repositories/area.repository';

/**
 * Los servicios son funciones que acceden al estado globla(Contexto) y son principalmente usados para conectar las peticiones con 
 * la logica de la librería(React).
 */
export const areaService = () => {

    const { areas, subareas, dispatch} = useContext(AreaContext);

    const startLoadAreas = async () => {
        const areas = await areaRepository.getAreas();
        typeof areas !== 'string' && dispatch({ type: 'AREA - Get areas', payload: areas });
    }
    
    const startLoadSubAreas = async (areaId: string) => {
        const areas = await areaRepository.getSubAreasByArea(areaId);
        typeof areas !== 'string' && dispatch({ type: 'AREA - Get subareas by areas', payload: areas });
    }


    return {
        areas,
        subareas,

        startLoadAreas,
        startLoadSubAreas,
        
    
    }


}
