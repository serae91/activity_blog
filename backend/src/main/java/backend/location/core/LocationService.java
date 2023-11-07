package backend.location.core;

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
}
