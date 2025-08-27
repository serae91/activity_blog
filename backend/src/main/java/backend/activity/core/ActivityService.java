package backend.activity.core;

import backend.activity.core.model.ActivityFilterDto;
import backend.activity.model.Activity;
import backend.activity.model.ActivityEntityView;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.EntityViewSetting;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Dependent
public class ActivityService {
    private static final String POST_TIME = "postTime";

    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public ActivityEntityView getActivityEntityViewById(final Long activityId) {
        final CriteriaBuilder<Activity> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Activity.class)
                .where("id").eq(activityId);
        return entityViewManager.applySetting(EntityViewSetting.create(ActivityEntityView.class), criteriaBuilder).getSingleResult();
    }

    public List<ActivityEntityView> getFilteredActivityEntityViews(final ActivityFilterDto activityFilter) {
        final CriteriaBuilder<Activity> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Activity.class);
        filterAuthor(criteriaBuilder, activityFilter);
        filterPersons(criteriaBuilder, activityFilter);
        filterLocations(criteriaBuilder, activityFilter);
        filterStartPostTime(criteriaBuilder, activityFilter);
        filterEndPostTime(criteriaBuilder, activityFilter);
        criteriaBuilder.orderByDesc(POST_TIME);
        return entityViewManager.applySetting(EntityViewSetting.create(ActivityEntityView.class), criteriaBuilder).getResultList();
    }

    private void filterAuthor(final CriteriaBuilder<Activity> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.authorId())) return;
        criteriaBuilder.where("author.id").eq(activityFilter.authorId());
    }

    private void filterPersons(final CriteriaBuilder<Activity> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.personIds()) || activityFilter.personIds().isEmpty()) return;
        criteriaBuilder.where("persons.id").in(activityFilter.personIds());
    }

    private void filterLocations(final CriteriaBuilder<Activity> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.locationIds()) || activityFilter.locationIds().isEmpty()) return;
        criteriaBuilder.where("locations.id").in(activityFilter.locationIds());
    }

    private void filterStartPostTime(final CriteriaBuilder<Activity> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.startPostTime())) return;
        criteriaBuilder.where(POST_TIME).ge(activityFilter.startPostTime());
    }

    private void filterEndPostTime(final CriteriaBuilder<Activity> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.endPostTime())) return;

        final Calendar cal = Calendar.getInstance();
        cal.setTime(activityFilter.endPostTime());
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 999);
        final Date endOfDay = cal.getTime();

        criteriaBuilder.where(POST_TIME).le(endOfDay);
    }
}
