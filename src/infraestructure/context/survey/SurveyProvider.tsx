import { ReactNode, useReducer } from 'react';
import { SurveyContext, surveyReducer } from './';
import { Pagination, Survey, GuideSurveyUserDetail, GuideUserSurvey } from '../../../domain/models';

interface Props {
    children: ReactNode
}
export interface SurveyState {
    survey              : Survey | null;
    surveys             : Pagination | null,
    hasSurvey           : boolean | null;
    guideUserSurvey     : Array<GuideUserSurvey> | [];
    users               : number;
    userDetail          : GuideSurveyUserDetail | null;
    totalUsersInSurvey  : number;
}

const INITIAL_STATE: SurveyState = {
    survey              : null,
    surveys             : null,
    hasSurvey           : null,
    guideUserSurvey     : [],
    users               : 0,
    userDetail          : null,
    totalUsersInSurvey  : 0
}

const SurveyProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(surveyReducer, INITIAL_STATE);


    return (
        <SurveyContext.Provider value={{ ...state, dispatch }}>
            {children}
        </SurveyContext.Provider>
    )
}

export default SurveyProvider