package backend.activity.usecase.create;

import backend.activity.usecase.create.model.ActivityCreateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ActivityCreateServiceTest {
    @Mock
    EntityManager entityManager;

    @Mock
    EntityViewManager entityViewManager;

    @InjectMocks
    ActivityCreateService activityCreateServiceService;

    @Mock
    ActivityCreateView activityCreateView;

    @Test
    void testCreateActivitySetsPostTimeAndSaves() {
        activityCreateServiceService.createActivity(activityCreateView);

        verify(activityCreateView).setPostTime(any(Date.class));
        verify(entityViewManager).save(entityManager, activityCreateView);
    }
}
