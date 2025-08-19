package backend.activity.web;

import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.usecase.create.model.CreateActivityDto;
import backend.activity.usecase.create.CreateActivityService;
import backend.activity.usecase.delete.DeleteActivityService;
import backend.activity.usecase.update.UpdateActivityService;
import backend.activity.usecase.update.model.ActivityUpdateView;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;

@Dependent
public class ActivityResourceFacade {
    @Inject
    ActivityService activityService;
    @Inject
    CreateActivityService createActivityService;
    @Inject
    UpdateActivityService updateActivityService;
    @Inject
    DeleteActivityService deleteActivityService;
    public Activity getActivityById(final Long activityId) {
        return activityService.getActivityById(activityId);
    }
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    public Activity createActivity(final CreateActivityDto createActivityDto) {
        return createActivityService.createActivity(createActivityDto);
    }

    public Activity updateActivity(final ActivityUpdateView activityUpdateView) {
        return updateActivityService.updateActivity(activityUpdateView);
    }

    public void deleteActivityById(final Long activityId) {
        deleteActivityService.deleteActivityById(activityId);
    }
}
