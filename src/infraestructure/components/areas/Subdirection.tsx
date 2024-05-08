import { DragEvent, Fragment, memo } from 'react';
import { Area, Departments } from '../../../domain/models';
import { SubdirectionItem } from './';

/**
 * Los componentes son parte clave de la aplicación y que se dividen de esta forma para poder ser reutilizados a lo largo de la aplicación
 */
interface Props {
    subdirections: Array<Departments>
    onDragStart: (event: DragEvent<HTMLDivElement>, area: Area) => void;
    onDragEnd: () => void;
}

export const Subdirection = memo(({ subdirections, onDragEnd }: Props) => {

    return (
        <Fragment>
            {
                subdirections.map((subdirection) => (
                    <SubdirectionItem
                        key={subdirection.id}
                        subdirection={subdirection}
                        onDragEnd={onDragEnd}
                        
                    />
                ))
            }
        </Fragment>
    )
})
