import { ReactNode, useReducer } from 'react';
import { AreaContext, areaReducer } from './';
import { Area  } from '../../../domain/models';

/**
 * El provider es el proovedor del estado en una aplicación de manera gobal y puede ser accedido en componentes que sean
 * hijos de este componente.
 */
interface Props {
    children: ReactNode | Array<ReactNode>
}
export interface DATETIME {
    startDate : Date | null,
    endDate   : Date | null,
}

export interface AreaState {
    areas   : Array<Area> | [];
    subareas: Array<Area> | [];
}

const INITIAL_STATE: AreaState = {
    subareas            : [],
    areas               : [],
}

export const AreaProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(areaReducer, INITIAL_STATE);

    return (
        <AreaContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AreaContext.Provider>

    )



}
