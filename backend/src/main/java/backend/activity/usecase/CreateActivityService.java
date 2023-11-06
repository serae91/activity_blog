package backend.activity.usecase;

import backend.activity.core.ActivityRepository;
import backend.activity.model.Activity;
import backend.activity.model.ActivityCreateDto;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class CreateActivityService {
    @Inject
    ActivityRepository activityRepository;

    public Activity createNewActivity(final ActivityCreateDto activityCreateDto) {
        final Activity newActivity = Activity.builder()
                .title(activityCreateDto.getTitle())
                .description(activityCreateDto.getDescription())
                .postTime(activityCreateDto.getPostTime())
                .build();
        return activityRepository.createNewActivity(newActivity);
    }
}
