package backend.location.core;

import backend.location.model.Location;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class LocationRepository implements PanacheRepository<Location> {
    public Optional<Location> getByLocationId(final Long locationId) {
        return findByIdOptional(locationId);
    }

    public List<Location> getAllLocations() {
        return listAll();
    }
    public Location createNewLocation(final Location location) {
        persist(location);
        return location;
    }
    public void deleteLocationById(final Long locationId) {
        deleteById(locationId);
    }
}
