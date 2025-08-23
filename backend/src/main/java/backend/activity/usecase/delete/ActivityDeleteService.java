package backend.activity.usecase.delete;

import backend.activity.model.Activity;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Objects;

@Dependent
public class ActivityDeleteService {

    @Inject
    EntityManager entityManager;

    public void deleteActivityById(final Long activityId) {
        final Activity activity = entityManager.find(Activity.class, activityId);
        if (Objects.nonNull(activity)) {
            entityManager.remove(activity);
        }
    }
}
