import { http } from '../http/http';
import { AreasResponseDto } from '../http/dto/areas';
import { Area } from '../../domain/models';


/**
 * Los repositorios son encargados de interactuar con el servidor y generar peticiones además de parsear la información que recibe.
 */
export const areaRepository = {

    getAreas: async (): Promise<Array<Area> | string> => {
        try {
            const { areas } = await http.get<AreasResponseDto>(`/auth/areas`);
            return areas.map(({ id, nombreArea, area_nivel, area_padre, users_count, }) => ({
                id,
                level: area_nivel,
                pather: area_padre,
                usersCount: users_count,
                name: nombreArea,
            }))
        } catch (error) {
            return error as string;
        }
    },

    getSubAreasByArea: async (areaId: string): Promise<Array<Area> | string> => {
        try {
            const { areas } = await http.get<AreasResponseDto>(`/auth/areas/detail/${areaId}`);
            return areas.map(({ id, nombreArea, area_nivel, area_padre, users_count, }) => ({
                id,
                level: area_nivel,
                pather: area_padre,
                usersCount: users_count,
                name: nombreArea,
            }))
        } catch (error) {
            return error as string;
        }
    },

}