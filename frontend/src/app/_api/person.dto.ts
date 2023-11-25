import { ActivityDto } from "./activity.dto";

export interface PersonListDto {
    person: PersonDto;
    canBeDeleted: boolean;
}

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