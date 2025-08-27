package backend.activity.usecase.update;

import backend.activity.usecase.update.model.ActivityUpdateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Objects;

@ApplicationScoped
public class ActivityUpdateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void updateActivity(final ActivityUpdateView activityUpdateView) {
        entityViewManager.save(entityManager, activityUpdateView);

        if (Objects.isNull(activityUpdateView.getPersons()) || activityUpdateView.getPersons().isEmpty()) {
            entityManager.createNativeQuery("DELETE FROM activity_person WHERE activity_id = :id")
                    .setParameter("id", activityUpdateView.getId())
                    .executeUpdate();
        }

        if (Objects.isNull(activityUpdateView.getLocations()) || activityUpdateView.getLocations().isEmpty()) {
            entityManager.createNativeQuery("DELETE FROM activity_location WHERE activity_id = :id")
                    .setParameter("id", activityUpdateView.getId())
                    .executeUpdate();
        }
    }
}
