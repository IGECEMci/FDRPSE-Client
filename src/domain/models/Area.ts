/**
 * Los modelos son la implementación de como deberian lucir las respuestas del servidor y pueden ser interfaces o clases.
 */
export interface Area {
    id:             number;
    name:           string;
    pather:         string;
    level:          string;
    usersCount:     number;
    subdirections?: Area[];
    departments?:   Area[];
}


export enum TypeAreas {
    Direction = 1,
    Subdirection = 2,
    Deparment = 3,
}