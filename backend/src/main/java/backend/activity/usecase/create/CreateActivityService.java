package backend.activity.usecase.create;

import backend.activity.core.ActivityRepository;
import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.usecase.create.model.CreateActivityDto;
import backend.location.core.LocationService;
import backend.location.model.Location;
import backend.person.core.PersonService;
import backend.person.model.Person;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.Date;
import java.util.List;

@Dependent
public class CreateActivityService {
    @Inject
    ActivityRepository activityRepository;
    @Inject
    ActivityService activityService;
    @Inject
    PersonService personService;
    @Inject
    LocationService locationService;

    public Activity createActivity(final CreateActivityDto createActivityDto) {
        final List<Person> persons = personService.getPersonsForPersonIds(createActivityDto.getPersonIds());
        final List<Location> locations = locationService.getLocationsForLocationIds(createActivityDto.getLocationIds());
        final Activity newActivity = Activity.builder()
                .author(personService.getPersonById(createActivityDto.getAuthorId()))
                .title(createActivityDto.getTitle())
                .description(createActivityDto.getDescription())
                .postTime(new Date())
                .locations(locations)
                .persons(persons)
                .build();
        final Activity result = activityRepository.createNewActivity(newActivity);
        return activityService.getActivityById(result.getId());
    }
}
