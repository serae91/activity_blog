package backend.activity.usecase.create;

import backend.activity.core.ActivityLocationRepository;
import backend.activity.core.ActivityPersonRepository;
import backend.activity.core.ActivityRepository;
import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.model.ActivityLocation;
import backend.activity.model.ActivityPerson;
import backend.activity.usecase.create.model.CreateActivityDto;
import backend.location.core.LocationService;
import backend.location.model.Location;
import backend.person.core.PersonService;
import backend.person.model.Person;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

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
    @Inject
    ActivityPersonRepository activityPersonRepository;
    @Inject
    ActivityLocationRepository activityLocationRepository;

    public Activity createNewActivity(final CreateActivityDto createActivityDto) {
        final List<Person> persons = personService.getPersonsForPersonIds(createActivityDto.getPersonIds());
        final List<Location> locations = locationService.getLocationsForLocationIds(createActivityDto.getLocationIds());
        final Activity newActivity = Activity.builder()
                .author(personService.getPersonById(createActivityDto.getAuthorId()))
                .title(createActivityDto.getTitle())
                .description(createActivityDto.getDescription())
                .postTime(createActivityDto.getPostTime())
                .build();
        final Activity result = activityRepository.createNewActivity(newActivity);
        persons.forEach(person -> activityPersonRepository.createNewActivityPerson(ActivityPerson.builder().activity(result).person(person).build()));
        locations.forEach(location -> activityLocationRepository.createNewActivityLocation(ActivityLocation.builder().activity(result).location(location).build()));
        return activityService.getActivityById(result.getId());
    }
}
