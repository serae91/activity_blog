package backend.activity.usecase.update;

import backend.activity.usecase.update.model.ActivityUpdateView;
import backend.location.model.LocationIdView;
import backend.person.model.PersonIdView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ActivityUpdateServiceTest {
    private static final String DELETE_PERSONS_QUERY = "DELETE FROM activity_person WHERE activity_id = :id";
    private static final String DELETE_LOCATIONS_QUERY = "DELETE FROM activity_location WHERE activity_id = :id";

    @Mock
    EntityManager entityManager;
    @Mock
    EntityViewManager entityViewManager;
    @InjectMocks
    ActivityUpdateService activityService;

    @Mock
    ActivityUpdateView activityUpdateView;
    @Mock
    PersonIdView personIdView;
    @Mock
    LocationIdView locationIdView;
    @Mock
    Query mockQuery;


    @Test
    void testUpdateActivity() {
        when(activityUpdateView.getPersons()).thenReturn(Set.of(personIdView));
        when(activityUpdateView.getLocations()).thenReturn(Set.of(locationIdView));

        activityService.updateActivity(activityUpdateView);

        verify(entityViewManager).save(entityManager, activityUpdateView);

        verify(entityManager, never()).createNativeQuery(DELETE_PERSONS_QUERY);
        verify(entityManager, never()).createNativeQuery(DELETE_LOCATIONS_QUERY);
    }

    @Test
    void testUpdateActivityDeletePersonsWhenEmpty() {
        when(activityUpdateView.getId()).thenReturn(1L);
        when(activityUpdateView.getPersons()).thenReturn(Set.of());
        when(activityUpdateView.getLocations()).thenReturn(Set.of(locationIdView));
        setUpQuery();

        activityService.updateActivity(activityUpdateView);

        verify(entityManager).createNativeQuery(DELETE_PERSONS_QUERY);
        verify(mockQuery).setParameter("id", 1L);
        verify(mockQuery).executeUpdate();

        verify(entityManager, never()).createNativeQuery(DELETE_LOCATIONS_QUERY);
    }

    @Test
    void testUpdateActivityDeleteLocationsWhenEmpty() {
        when(activityUpdateView.getId()).thenReturn(1L);
        when(activityUpdateView.getPersons()).thenReturn(Set.of(personIdView));
        when(activityUpdateView.getLocations()).thenReturn(Set.of());
        setUpQuery();

        activityService.updateActivity(activityUpdateView);

        verify(entityManager).createNativeQuery(DELETE_LOCATIONS_QUERY);
        verify(mockQuery).setParameter("id", 1L);
        verify(mockQuery).executeUpdate();

        verify(entityManager, never()).createNativeQuery(DELETE_PERSONS_QUERY);
    }

    @Test
    void testUpdateActivityDeleteBothWhenEmpty() {
        when(activityUpdateView.getId()).thenReturn(1L);
        when(activityUpdateView.getPersons()).thenReturn(Set.of());
        when(activityUpdateView.getLocations()).thenReturn(Set.of());
        setUpQuery();

        activityService.updateActivity(activityUpdateView);

        verify(entityManager).createNativeQuery(DELETE_PERSONS_QUERY);
        verify(entityManager).createNativeQuery(DELETE_LOCATIONS_QUERY);
        verify(mockQuery, times(2)).executeUpdate();
    }

    private void setUpQuery() {
        when(entityManager.createNativeQuery(anyString())).thenReturn(mockQuery);
        when(mockQuery.setParameter(anyString(), any())).thenReturn(mockQuery);
        when(mockQuery.executeUpdate()).thenReturn(1);
    }
}
