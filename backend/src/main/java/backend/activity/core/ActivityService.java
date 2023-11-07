package backend.activity.core;

import backend.activity.model.Activity;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;

@Dependent
public class ActivityService {
    @Inject
    ActivityRepository activityRepository;
    public Activity getActivityById(final Long activityId) {
        final Optional<Activity> optionalActivity = activityRepository.findByIdOptional(activityId);
        if(optionalActivity.isPresent()) {
            return optionalActivity.get();
        }
        return null;
    }

    public List<Activity> getAllActivities() {
        return activityRepository.getAllActivities();
    }
}
