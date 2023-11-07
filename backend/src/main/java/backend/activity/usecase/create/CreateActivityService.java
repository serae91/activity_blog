package backend.activity.usecase.create;

import backend.activity.core.ActivityRepository;
import backend.activity.model.Activity;
import backend.activity.usecase.create.model.CreateActivityDto;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class CreateActivityService {
    @Inject
    ActivityRepository activityRepository;

    public Activity createNewActivity(final CreateActivityDto activityCreateDto) {
        final Activity newActivity = Activity.builder()
                .title(activityCreateDto.getTitle())
                .description(activityCreateDto.getDescription())
                .postTime(activityCreateDto.getPostTime())
                .build();
        return activityRepository.createNewActivity(newActivity);
    }
}
