package backend.activity.web;

import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.model.ActivityCreateDto;
import backend.activity.usecase.CreateActivityService;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;

@Dependent
public class ActivityResourceFacade {
    @Inject
    ActivityService activityService;
    @Inject
    CreateActivityService createActivityService;
    public Activity getActivityById(final Long activityId) {
        return activityService.getActivityById(activityId);
    }
    public List<Activity> getAllActivities() {
        return activityService.getAll();
    }

    public Activity createNewActivity(final ActivityCreateDto activityCreateDto) {
        return createActivityService.createNewActivity(activityCreateDto);
    }
}
