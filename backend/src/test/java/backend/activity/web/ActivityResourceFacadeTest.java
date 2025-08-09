package backend.activity.web;

import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.usecase.create.CreateActivityService;
import backend.activity.usecase.create.model.CreateActivityDto;
import backend.activity.usecase.delete.DeleteActivityService;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ActivityResourceFacadeTest {
    @Mock
    ActivityService activityService;
    @Mock
    CreateActivityService createActivityService;
    @Mock
    DeleteActivityService deleteActivityService;
    @InjectMocks
    ActivityResourceFacade activityResourceFacade;
    @Mock
    Activity activity;
    @Mock
    CreateActivityDto createActivityDto;

    @Test
    void getActivityByIdTest() {
        when(activityService.getActivityById(7L)).thenReturn(activity);
        final Activity result = activityResourceFacade.getActivityById(7L);
        MatcherAssert.assertThat(result, CoreMatchers.is(activity));
    }

    @Test
    void getAllActivitiesTest() {
        when(activityService.getAllActivities()).thenReturn(List.of(activity));
        final List<Activity> result = activityResourceFacade.getAllActivities();
        MatcherAssert.assertThat(result, CoreMatchers.is(List.of(activity)));
    }

    @Test
    void createNewActivityTest() {
        when(createActivityService.createActivity(createActivityDto)).thenReturn(activity);
        final Activity result = activityResourceFacade.createActivity(createActivityDto);
        MatcherAssert.assertThat(result, CoreMatchers.is(activity));
    }

    @Test
    void deleteActivityByIdTest() {
        activityResourceFacade.deleteActivityById(7L);
        verify(deleteActivityService).deleteActivityById(7L);
    }
}
