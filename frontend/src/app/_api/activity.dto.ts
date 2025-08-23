import { LocationDto } from "./location.dto";
import { PersonDto } from "./person.dto";
import { IdDto } from './id.dto';

export interface ActivityDto {
    id: number;
    author: PersonDto;
    title: string;
    description: string;
    postTime: Date;
    persons: PersonDto[];
    locations: LocationDto[];
}

export interface ActivityFilterDto {
  authorId: number;
  personIds: number[];
  locationIds: number[];
  startPostTime: Date;
  endPostTime: Date;
}

export interface ActivityCreateDto {
    author: IdDto;
    title: string;
    description: string;
    persons: IdDto[];
    locations: IdDto[];
}

export interface ActivityUpdateDto {
  id: number;
  author: IdDto;
  title: string;
  description: string;
  persons: IdDto[];
  locations: IdDto[];
}
