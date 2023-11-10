package backend.activity.core;

import backend.activity.model.ActivityPerson;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ActivityPersonRepository implements PanacheRepository<ActivityPerson> {
    public ActivityPerson createNewActivityPerson(final ActivityPerson activityPerson) {
        persist(activityPerson);
        return activityPerson;
    }
}
