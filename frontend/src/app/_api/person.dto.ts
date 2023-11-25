import { ActivityDto } from "./activity.dto";

export interface PersonDto {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    activities: ActivityDto[];
}

export interface CreatePersonDto {
    firstName: string;
    lastName: string;
    birthday: Date;
}