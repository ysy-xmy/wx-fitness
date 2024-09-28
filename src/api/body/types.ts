export interface inputBodyType {
    Count: number;
    EndTime?: string;
    StartTime?: string;
    Type: string;
    [property: string]: any;
}

export interface addBodyType {
    Type: string;
    Value: number;
}