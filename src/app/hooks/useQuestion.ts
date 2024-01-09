import { useContext, useState, DragEvent } from 'react';
import { QuestionContext } from '../../infraestructure/context/questions';
import { Question } from '../../domain/models';

import { categoriesService } from '../../domain/services/categories.service';
import { domianService } from '../../domain/services/domian.service';
import { dimensionService } from '../../domain/services/dimension.service';
import { CreateQuestionDto } from '../../infraestructure/http/dto/questions';

export const useQuestion = () => {

    const [loading, setLoading] = useState(false);
    const { dispatch, question, questions } = useContext(QuestionContext);

    const { startGetCategories, categories } = categoriesService();
    const { startGetDomains, domains } = domianService();
    const { startGetDimensions, dimensions } = dimensionService()

    const getQuestionDetailsBeforeSave = ({ category_id = '', dimension_id = '', domain_id = '' }) => ({
        category : categories.find(category => category.id == category_id)!,
        dimension: dimensions.find(dimension => dimension.id == dimension_id),
        domain   : domains.find(domain => domain.id == domain_id),
    });

    const preSaveQuestion = ({ question, ...rest }: CreateQuestionDto) => {
        const getDetails = getQuestionDetailsBeforeSave(rest);
        dispatch({
            type: 'QUESTION - Presave question',
            payload: {
                ...new Question(crypto.randomUUID(), question, new Date().toLocaleString(), new Date().toLocaleString()),
                ...getDetails,
            },
        });
    }

    const startGetCategoriesDomainAndDimenstions = async (): Promise<void> => {
        setLoading(prev => !prev);
        await Promise.all([startGetCategories(), startGetDomains(), startGetDimensions()]);
        setLoading(prev => !prev);
    }

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer?.setData('text', question!.id);
        setLoading(true);
    }

    const onDragEnd = () => setLoading(false);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropQuestion = (event: DragEvent<HTMLDivElement>) => {
        const id = event?.dataTransfer.getData('text');

        onDragEnd();
    }

    return {
        loading,
        question,
        questions,
        preSaveQuestion,
        startGetCategoriesDomainAndDimenstions,

        onDragStart,
        onDragEnd,
        allowDrop,
        onDropQuestion
    }
}