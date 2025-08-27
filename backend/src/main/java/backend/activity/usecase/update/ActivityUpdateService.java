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
            deleteTableConnection("activity_person", activityUpdateView.getId());
        }
        
        if (Objects.isNull(activityUpdateView.getLocations()) || activityUpdateView.getLocations().isEmpty()) {
            deleteTableConnection("activity_location", activityUpdateView.getId());
        }
    }

    private void deleteTableConnection(final String tableName, final Long activityId) {
        entityManager.createNativeQuery("DELETE FROM " + tableName + " WHERE activity_id = :id")
                .setParameter("id", activityId)
                .executeUpdate();
    }
}
