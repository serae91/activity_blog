export interface ActivityDto {
    id: number;
    title: string;
    description: string;
    postTime: Date;
}

export interface CreateActivityDto {
    title: string;
    description: string;
    postTime: Date;
}