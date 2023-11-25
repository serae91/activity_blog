package backend.location.web;

import backend.location.core.LocationService;
import backend.location.core.listview.LocationListDto;
import backend.location.model.Location;
import backend.location.usecase.create.CreateLocationService;
import backend.location.usecase.create.model.CreateLocationDto;
import backend.location.usecase.delete.DeleteLocationService;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;

@Dependent
public class LocationResourceFacade {
    @Inject
    LocationService locationService;
    @Inject
    CreateLocationService createLocationService;
    @Inject
    DeleteLocationService deleteLocationService;
    public Location getLocationById(final Long personId) {
        return locationService.getLocationById(personId);
    }

    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }
    public List<LocationListDto> getAllLocationListDtos() {
        return locationService.getAllLocationListDtos();
    }

    public Location createNewLocation(final CreateLocationDto createLocationDto) {
        return createLocationService.createNewLocation(createLocationDto);
    }

    public void deleteLocationById(final Long locationId) {
        deleteLocationService.deleteLocationById(locationId);
    }
}
