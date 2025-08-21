package backend.activity.usecase.create;

import backend.activity.model.ActivityEntityView;
import backend.activity.usecase.create.model.ActivityCreateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Date;

@Dependent
public class ActivityCreateService {

    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public ActivityEntityView createActivity(final ActivityCreateView activityCreateView) {
        activityCreateView.setPostTime(new Date());
        entityViewManager.save(entityManager, activityCreateView);
        entityManager.flush();
        return entityViewManager.find(entityManager, ActivityEntityView.class, activityCreateView.getId());
    }
}
