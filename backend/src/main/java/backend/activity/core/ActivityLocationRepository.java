package backend.activity.core;

import backend.activity.model.ActivityLocation;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ActivityLocationRepository implements PanacheRepository<ActivityLocation> {
    public ActivityLocation createNewActivityLocation(final ActivityLocation activityLocation) {
        persist(activityLocation);
        return activityLocation;
    }
}
