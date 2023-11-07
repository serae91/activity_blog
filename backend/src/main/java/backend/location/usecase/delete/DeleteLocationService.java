package backend.location.usecase.delete;

import backend.location.core.LocationRepository;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class DeleteLocationService {
    @Inject
    LocationRepository locationRepository;
    public void deleteLocationById(final Long locationId) {
        locationRepository.deleteLocationById(locationId);
    }
}
