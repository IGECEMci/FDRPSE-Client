export interface GuideResponseDto {
    id              : number;
    name            : string;
    gradable        : boolean;
    created_at      : string;
    updated_at      : string;
    status          : number;
    surveys         : Array<Survey>
}

interface Survey {
    id:    number;
    pivot: Pivot;
}

interface Pivot {
    guide_id:      number;
    survey_id:     number;
    qualification: Qualification;
    status: number;
}

interface Qualification {
    id:                     number;
    low:                    string;
    high:                   string;
    middle:                 string;
    very_high:              string;
    despicable:             string;
}