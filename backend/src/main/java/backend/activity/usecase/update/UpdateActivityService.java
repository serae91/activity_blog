package backend.activity.usecase.update;

import backend.activity.core.ActivityRepository;
import backend.activity.model.Activity;
import backend.activity.model.ActivityEntityView;
import backend.activity.usecase.update.model.ActivityUpdateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class UpdateActivityService {
    @Inject
    ActivityRepository activityRepository;
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public ActivityEntityView updateActivity(final ActivityUpdateView activityUpdateView) {
        entityViewManager.save(entityManager, activityUpdateView);
        return entityViewManager.find(entityManager, ActivityEntityView.class, activityUpdateView.getId());
    }
}
