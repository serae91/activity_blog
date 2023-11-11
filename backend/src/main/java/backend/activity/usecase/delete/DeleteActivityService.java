package backend.activity.usecase.delete;

import backend.activity.core.ActivityLocationRepository;
import backend.activity.core.ActivityPersonRepository;
import backend.activity.core.ActivityRepository;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class DeleteActivityService {
    @Inject
    ActivityRepository activityRepository;
    @Inject
    ActivityLocationRepository activityLocationRepository;
    @Inject
    ActivityPersonRepository activityPersonRepository;
    public void deleteActivityById(final Long activityId) {
        activityLocationRepository.deleteAllActivityLocationsForActivity(activityId);
        activityPersonRepository.deleteAllActivityPersonsForActivity(activityId);
        activityRepository.deleteActivityById(activityId);
    }
}
