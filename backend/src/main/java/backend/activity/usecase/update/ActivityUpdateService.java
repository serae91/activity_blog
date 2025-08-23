package backend.activity.usecase.update;

import backend.activity.usecase.update.model.ActivityUpdateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class ActivityUpdateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void updateActivity(final ActivityUpdateView activityUpdateView) {
        entityViewManager.save(entityManager, activityUpdateView);
    }
}
