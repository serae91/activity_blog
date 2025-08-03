package backend.activity.usecase.create;

import backend.activity.core.ActivityRepository;
import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.usecase.create.model.CreateActivityDto;
import backend.location.core.LocationService;
import backend.location.model.Location;
import backend.person.core.PersonService;
import backend.person.model.Person;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CreateActivityServiceTest {
    @Mock
    ActivityRepository activityRepository;
    @Mock
    ActivityService activityService;
    @Mock
    PersonService personService;
    @Mock
    LocationService locationService;
    @Mock
    ActivityPersonRepository activityPersonRepository;
    @Mock
    ActivityLocationRepository activityLocationRepository;
    @InjectMocks
    CreateActivityService createActivityService;
    @Mock
    Activity resultActivity;
    @Mock
    Person author;
    @Mock
    Person person;
    @Mock
    Location location;
    @Mock
    CreateActivityDto createActivityDto;
    @Mock
    Date postTime;

    @Test
    void createNewActivityTest() {
        when(resultActivity.getId()).thenReturn(1L);
        when(activityService.getActivityById(1L)).thenReturn(resultActivity);

        when(createActivityDto.getAuthorId()).thenReturn(2L);
        when(createActivityDto.getTitle()).thenReturn("mockTitle");
        when(createActivityDto.getDescription()).thenReturn("mockDesciption");
        when(createActivityDto.getPostTime()).thenReturn(postTime);
        when(createActivityDto.getPersonIds()).thenReturn(List.of(3L));
        when(createActivityDto.getLocationIds()).thenReturn(List.of(4L));

        when(personService.getPersonById(2L)).thenReturn(author);
        when(personService.getPersonsForPersonIds(List.of(3L))).thenReturn(List.of(person));
        when(locationService.getLocationsForLocationIds(List.of(4L))).thenReturn(List.of(location));

        when(activityRepository.createNewActivity(any())).thenReturn(resultActivity);

        final Activity result = createActivityService.createNewActivity(createActivityDto);
        verify(activityRepository).createNewActivity(any());
        verify(activityPersonRepository).createNewActivityPerson(any());
        verify(activityLocationRepository).createNewActivityLocation(any());
        MatcherAssert.assertThat(result, CoreMatchers.is(resultActivity));
    }
}
