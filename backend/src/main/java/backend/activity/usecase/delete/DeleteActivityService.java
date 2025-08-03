package backend.activity.usecase.delete;

import backend.activity.core.ActivityRepository;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class DeleteActivityService {
    @Inject
    ActivityRepository activityRepository;
    public void deleteActivityById(final Long activityId) {
        //activityLocationRepository.deleteAllActivityLocationsForActivity(activityId);
        //activityPersonRepository.deleteAllActivityPersonsForActivity(activityId);
        activityRepository.deleteActivityById(activityId);
    }
}
