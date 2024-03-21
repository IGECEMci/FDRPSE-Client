import { useCallback, useContext, useState } from 'react';
import { sectionRespository } from '../../infraestructure/repositories/section.repository';
import { SectionContext } from '../../infraestructure/context/section';
import { CreateSectionDto, PostSectionsIdDto } from '../../infraestructure/http/dto/sections';
import { Section, SectionQuesions } from '../models';

interface Props {
    onOpenAuxiliarModel?: () => void;
}

export const sectionService = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const { dispatch, section, sections, sectionsSelected, sectionDetail } = useContext(SectionContext);

    const startGetSections = async (type: string): Promise<void> => {
        dispatch({ type: 'SECTION - Start load sections', payload: [] })
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSections(type);
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }

    const startCreateSection = async (createSectionDto: CreateSectionDto): Promise<void> => {
        setLoading(prev => !prev);
        const section = await sectionRespository.createSection(createSectionDto);
        typeof section !== 'string' && dispatch({ type: 'SECTION - Create new section', payload: section });
        setLoading(prev => !prev);
    }

    const startGetSectionsWithQuestions = useCallback(async (): Promise<void> => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSectionWithQuestions();
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }, []);

    const startGetSectionsBy = useCallback(async (type: boolean): Promise<void> => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getSectionsByType(type);
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections', payload: sections });
        setLoading(prev => !prev);
    }, []);


    const getSectionDetail = async (newSection: Section) => {
        if (section && newSection.id === section?.id) {
            props.onOpenAuxiliarModel && props.onOpenAuxiliarModel();
            return;
        }
        setLoading(prev => !prev);
        props.onOpenAuxiliarModel && props.onOpenAuxiliarModel();
        const data = await sectionRespository.getSectionDetail(newSection.id);
        typeof data !== 'string' && dispatch({ type: 'SECTION - Start load section', payload: data });
        setLoading(prev => !prev);
    }


    const getSectionsDetailWithQuestions = async (sectionsId: PostSectionsIdDto) => {
        setLoading(prev => !prev);
        const sections = await sectionRespository.getMultipleSectionsWithQuestions(sectionsId);
        typeof sections !== 'string' && dispatch({ type: 'SECTION - Start load sections with questions', payload: sections });
        setLoading(prev => !prev);
    }

    const findCurrentSection = (currentSection: SectionQuesions) => {
        if (currentSection && currentSection.id === section?.id) return;
        dispatch({ type: 'SECTION - Get current section', payload: currentSection });
    }

    const clearSectionsSelected = useCallback(() => {
        if (sectionsSelected.length < 0) return;
        dispatch({ type: 'SECTION - Filter bad selection by type gudide' });
    }, []);


    const getSecionById = useCallback(async (sectionId: string) => {
        setLoading(prev => !prev);
        const section = await sectionRespository.getOneSection(sectionId);
        typeof section !== 'string' && dispatch({ type: 'SECTION - Load section detail', payload: section });
        setLoading(prev => !prev);
    }, []);


    const clearSectionCache = () => dispatch({ type: 'SECTION - Clear cache section' })

    return {
        loading,
        section,
        sections,
        sectionDetail,
        sectionsSelected,

        clearSectionCache,
        findCurrentSection,
        getSectionDetail,
        getSecionById,
        startGetSections,
        startCreateSection,
        startGetSectionsBy,
        clearSectionsSelected,
        startGetSectionsWithQuestions,
        getSectionsDetailWithQuestions,
    }
}
