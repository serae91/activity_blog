package backend.location.core;

import backend.location.core.listview.LocationListDto;
import backend.location.model.Location;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;

@Dependent
public class LocationService {
    @Inject
    LocationRepository locationRepository;
    public Location getLocationById(final Long personId) {
        final Optional<Location> optionalLocation = locationRepository.findByIdOptional(personId);
        if(optionalLocation.isPresent()) {
            return optionalLocation.get();
        }
        return null;
    }

    public List<Location> getAllLocations() {
        return locationRepository.getAllLocations();
    }
    public List<Location> getLocationsForLocationIds(final List<Long> locationIds) {
        return locationIds.stream().map(locationId -> getLocationById(locationId)).toList();
    }

    public List<LocationListDto> getAllLocationListDtos() {
        final List<Location> allLocations = getAllLocations();
        return allLocations.stream().map(this::getLocationListDto).toList();
    }

    private LocationListDto getLocationListDto(final Location location) {
        final Boolean canBeDeleted = false;//activityPersonsForPerson.isEmpty();
        return LocationListDto.builder()
                .location(location)
                .canBeDeleted(canBeDeleted)
                .build();
    }
}
