import { QuestionsInsideSection } from '../../infraestructure/http/dto/questions/QuestionsBySectionResponse';

/**
 * Los helper son funciones que encapsulan lógica que es independiente y puede ser usada en diferentes puntos de la aplicación
 */

import * as Yup from 'yup';

export interface QuestionsField {
    [key: string]: string;
}

export const createFieldQuestionValidations = (questions: Array<QuestionsInsideSection>) => {
    return questions?.reduce((prev, curr) => {
        prev = { ...prev, [`question_id_${curr.id}`]: Yup.string().required('Selecciona una opción') };
        return prev;
    }, {}) || {};
}