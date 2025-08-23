package backend.activity.web;

import backend.activity.core.ActivityService;
import backend.activity.model.ActivityEntityView;
import org.hamcrest.CoreMatchers;
import org.hamcrest.MatcherAssert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ActivityResourceTest {
    @Mock
    ActivityService activityService;

    @InjectMocks
    ActivityResource activityResource;

    @Mock
    private ActivityEntityView activity;

    @Test
    void getActivityByIdTest() {
        when(activityService.getActivityEntityViewById(7L)).thenReturn(activity);
        final ActivityEntityView result = activityResource.getActivityById(7L);
        MatcherAssert.assertThat(result, CoreMatchers.is(activity));
    }
}
