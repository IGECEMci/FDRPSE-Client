import { AreaState } from './';
import { Area } from '../../../domain/models';

/**
 * Los reduces son funciones que te permiten modificar estados globales de forma local
 */
export type AreaActionType =
    | { type: 'AREA - Get areas', payload: Array<Area> }
    | { type: 'AREA - Get subareas by areas', payload: Array<Area> }

export const areaReducer = (state: AreaState, action: AreaActionType) => {

    switch (action.type) {
        case 'AREA - Get areas':
            return {
                ...state,
                areas: action.payload,
            }
        case 'AREA - Get subareas by areas':
            return {
                ...state,
                subareas: action.payload,
            }
    }

}
