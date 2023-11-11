package backend.activity.core;

import backend.activity.model.ActivityPerson;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class ActivityPersonRepository implements PanacheRepository<ActivityPerson> {
    @Inject
    EntityManager entityManager;
    public ActivityPerson createNewActivityPerson(final ActivityPerson activityPerson) {
        persist(activityPerson);
        return activityPerson;
    }

    public List<ActivityPerson> getAllActivityPersonsForActivity(final Long activityId) {
        return list("activity.id", activityId);
    }

    public void deleteAllActivityPersonsForActivity(final Long activityId) {
        final List<ActivityPerson> activityLocations = getAllActivityPersonsForActivity(activityId);
        activityLocations.forEach(this::delete);
        entityManager.flush();
        entityManager.clear();
    }
}
