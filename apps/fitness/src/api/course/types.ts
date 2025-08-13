/**
 * Request
 */
export interface planRequest {
    Actions: Action[];
    CourseID: number;
    PlanTime: string;
    Type: courseType;
    UserID: number;
    [property: string]: any;
}

export interface Action {
    ActionName: string;
    ExerciseActionID: number;
    GroupNum: number;
    [property: string]: any;
}

export enum courseType {
    Online = "ONLINE",
    Outline = "OUTLINE",
}