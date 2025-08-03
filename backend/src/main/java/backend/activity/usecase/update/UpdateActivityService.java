package backend.activity.usecase.update;

import backend.activity.core.ActivityRepository;
import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.usecase.update.model.UpdateActivityDto;
import backend.location.core.LocationService;
import backend.location.model.Location;
import backend.person.core.PersonService;
import backend.person.model.Person;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;

@Dependent
public class UpdateActivityService {
    @Inject
    ActivityRepository activityRepository;
    @Inject
    ActivityService activityService;
    @Inject
    PersonService personService;
    @Inject
    LocationService locationService;

    public Activity updateActivity(final UpdateActivityDto updateActivityDto) {
        final Activity activityToUpdate = activityRepository.findById(updateActivityDto.getId());
        final List<Person> persons = personService.getPersonsForPersonIds(updateActivityDto.getPersonIds());
        final List<Location> locations = locationService.getLocationsForLocationIds(updateActivityDto.getLocationIds());

        activityToUpdate.setAuthor(personService.getPersonById(updateActivityDto.getAuthorId()));
        activityToUpdate.setTitle(updateActivityDto.getTitle());
        activityToUpdate.setDescription(updateActivityDto.getDescription());
        activityToUpdate.setPersons(persons);
        activityToUpdate.setLocations(locations);
        return activityToUpdate;
    }
}
