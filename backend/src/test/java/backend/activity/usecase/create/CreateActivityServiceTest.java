package backend.activity.usecase.create;

import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.usecase.create.model.ActivityCreateView;
import backend.location.core.LocationService;
import backend.location.model.Location;
import backend.person.core.PersonService;
import backend.person.model.Person;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

@ExtendWith(MockitoExtension.class)
public class CreateActivityServiceTest {
    @Mock
    ActivityService activityService;
    @Mock
    PersonService personService;
    @Mock
    LocationService locationService;
    @InjectMocks
    ActivityCreateService activityCreateService;
    @Mock
    Activity resultActivity;
    @Mock
    Person author;
    @Mock
    Person person;
    @Mock
    Location location;
    @Mock
    ActivityCreateView activityCreateView;
    @Mock
    Date postTime;

    @Test
    void createNewActivityTest() {
        /*when(resultActivity.getId()).thenReturn(1L);
        when(activityService.getActivityById(1L)).thenReturn(resultActivity);

        when(activityCreateView.getAuthorId()).thenReturn(2L);
        when(activityCreateView.getTitle()).thenReturn("mockTitle");
        when(activityCreateView.getDescription()).thenReturn("mockDesciption");
        when(activityCreateView.getPostTime()).thenReturn(postTime);
        when(activityCreateView.getPersonIds()).thenReturn(List.of(3L));
        when(activityCreateView.getLocationIds()).thenReturn(List.of(4L));

        when(personService.getPersonById(2L)).thenReturn(author);
        when(personService.getPersonsForPersonIds(List.of(3L))).thenReturn(List.of(person));
        when(locationService.getLocationsForLocationIds(List.of(4L))).thenReturn(List.of(location));

        when(activityRepository.createNewActivity(any())).thenReturn(resultActivity);

        final Activity result = activityCreateService.createActivity(activityCreateView);
        verify(activityRepository).createNewActivity(any());
        verify(activityPersonRepository).createNewActivityPerson(any());
        verify(activityLocationRepository).createNewActivityLocation(any());
        MatcherAssert.assertThat(result, CoreMatchers.is(resultActivity));*/
    }
}
