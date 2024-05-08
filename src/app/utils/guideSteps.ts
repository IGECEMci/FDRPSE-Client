import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import { IconFunction } from '../../infraestructure/components/icons/IconProps';
import { FormNameAndTypeGuide, PreviewNewGuide, SetQualification, SetSectionToGuide } from '../../infraestructure/components/guides';

/**
 * Son funciones que son utiles para diferentes cosas de la aplicación como cargar componetes, establecer interfaces y en este caso son para el 
 * componente de pasos, donde se muestran componentes paso por paso y de manera dinamica.
 */
export interface Props {
    step?: number,
    nextStep?: () => void;
    backStep?: () => void;
}
export interface ValidateStep {
    canContinue: () => boolean | Promise<boolean>;
}
export interface StepComponent {
    name            : string;
    component       : ForwardRefExoticComponent<Props & RefAttributes<ValidateStep>>;
    icon           ?: IconFunction;
}

export const GUIDE_STEPS: Array<StepComponent> = [
    {
        name: 'Nombre y tipo de cuestionario',
        component: FormNameAndTypeGuide,
    },
    {
        name: 'Secciones dentro del cuestionario',
        component: SetSectionToGuide,
    },
    {
        name: 'Asignar calificación al cuestionario',
        component: SetQualification,
    },
    {
        name: 'Antes de guardar',
        component: PreviewNewGuide,
    }
    
];
