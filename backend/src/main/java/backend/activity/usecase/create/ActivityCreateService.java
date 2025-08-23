package backend.activity.usecase.create;

import backend.activity.usecase.create.model.ActivityCreateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Date;

@ApplicationScoped
public class ActivityCreateService {

    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void createActivity(final ActivityCreateView activityCreateView) {
        activityCreateView.setPostTime(new Date());
        entityViewManager.save(entityManager, activityCreateView);
    }
}
