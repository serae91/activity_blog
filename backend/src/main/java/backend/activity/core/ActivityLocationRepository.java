package backend.activity.core;

import backend.activity.model.ActivityLocation;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class ActivityLocationRepository implements PanacheRepository<ActivityLocation> {
    @Inject
    EntityManager entityManager;
    public ActivityLocation createNewActivityLocation(final ActivityLocation activityLocation) {
        persist(activityLocation);
        return activityLocation;
    }

    public List<ActivityLocation> getAllActivityLocationsForActivity(final Long activityId) {
        return list("activity.id", activityId);
    }

    public List<ActivityLocation> getAllActivityLocationsForLocation(final Long locationId) {
        return list("location.id", locationId);
    }

    public void deleteAllActivityLocationsForActivity(final Long activityId) {
        final List<ActivityLocation> activityLocations = getAllActivityLocationsForActivity(activityId);
        activityLocations.forEach(this::delete);
        entityManager.flush();
        entityManager.clear();
    }
}
