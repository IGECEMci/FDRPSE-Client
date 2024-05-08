import { Dispatch, createContext } from 'react';
import { AreaActionType, AreaState } from './';
/**
 * El contexto es un componente que se crea para poder acceder a un estado de manera global
 */

export interface ContextProps extends AreaState {
    dispatch: Dispatch<AreaActionType>
}

export const AreaContext = createContext({} as ContextProps);