package backend.location.usecase.delete;

import backend.location.model.Location;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Objects;

@Dependent
public class LocationDeleteService {
    @Inject
    EntityManager entityManager;

    public void deleteLocationById(final Long locationId) {
        final Location activity = entityManager.find(Location.class, locationId);
        if (Objects.nonNull(activity)) {
            entityManager.remove(activity);
        }
    }
}
