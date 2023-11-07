package backend.location.usecase.create;

import backend.location.core.LocationRepository;
import backend.location.model.Location;
import backend.location.usecase.create.model.CreateLocationDto;
import backend.person.core.PersonRepository;
import backend.person.model.Person;
import backend.person.usecase.create.model.CreatePersonDto;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class CreateLocationService {
    @Inject
    LocationRepository locationRepository;

    public Location createNewLocation(final CreateLocationDto createLocationDto) {
        final Location newLocation = Location.builder()
                .name(createLocationDto.getName())
                .country(createLocationDto.getCountry())
                .city(createLocationDto.getCity())
                .postalCode(createLocationDto.getPostalCode())
                .street(createLocationDto.getStreet())
                .streetNumber(createLocationDto.getStreetNumber())
                .build();
        return locationRepository.createNewLocation(newLocation);
    }
}
