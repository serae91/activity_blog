export interface LocationListDto {
  location: LocationDto;
  activityCount: number;
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

export interface LocationCreateDto {
  name: string;
  country: string;
  city: string;
  postalCode: number;
  street: string;
  streetNumber: number;
}

export interface LocationUpdateDto {
  id: number;
  name: string;
  country: string;
  city: string;
  postalCode: number;
  street: string;
  streetNumber: number;
}
