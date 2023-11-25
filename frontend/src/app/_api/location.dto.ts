export interface LocationListDto {
    location: LocationDto;
    canBeDeleted: boolean;
}

export interface LocationDto {
    id: number;
    name: string;
    country: string;
    city: string;
    postalCode: number;
    street: string;
    streetNumber: number;
}



export interface CreateLocationDto {
    name: string;
    country: string;
    city: string;
    postalCode: number;
    street: string;
    streetNumber: number;
}