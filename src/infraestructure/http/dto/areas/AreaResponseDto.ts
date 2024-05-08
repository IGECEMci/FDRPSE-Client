/**
 * Los DTO son interfaces que se comunican con el servidor y sirven para obtener la forma en la cual luce la información que se envía o
 * se recibe del servidor.
 */

export interface AreaResponseDto {
    areas: AreaElement[];
}

interface AreaElement {
    id:             number;
    nombreArea:     string;
    area_padre:     string;
    area_nivel:     string;
    users_count:    number;
    subdirections?: AreaElement[];
    departments?:   AreaElement[];
}
