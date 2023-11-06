package backend.activity.core;

import backend.activity.model.Activity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class ActivityRepository implements PanacheRepository<Activity> {
    public Optional<Activity> getByActivityId(final Long sponsorId) {
        return findByIdOptional(sponsorId);
    }

    public List<Activity> getAll() {
        return listAll();
    }
    public Activity createNewActivity(final Activity activity) {
        persist(activity);
        return activity;
    }
}
