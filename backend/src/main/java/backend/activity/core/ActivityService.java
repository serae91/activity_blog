package backend.activity.core;

import backend.activity.core.model.ActivityFilterDto;
import backend.activity.model.Activity;
import backend.activity.model.ActivityEntityView;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;
import java.util.Objects;

@Dependent
public class ActivityService {

    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public ActivityEntityView getActivityEntityViewById(final Long activityId) {
        return criteriaBuilderFactory.create(entityManager, ActivityEntityView.class)
                .where("id").eq(activityId).getSingleResult();
    }

    public List<ActivityEntityView> getFilteredActivityEntityViews(final ActivityFilterDto activityFilter) {
        final CriteriaBuilder<ActivityEntityView> criteriaBuilder = criteriaBuilderFactory.create(entityManager, ActivityEntityView.class).from(Activity.class);
        filterAuthor(criteriaBuilder, activityFilter);
        filterPersons(criteriaBuilder, activityFilter);
        filterLocations(criteriaBuilder, activityFilter);
        filterStartPostTime(criteriaBuilder, activityFilter);
        filterEndPostTime(criteriaBuilder, activityFilter);
        return criteriaBuilder.getResultList();
    }

    private void filterAuthor(final CriteriaBuilder<ActivityEntityView> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.authorId())) return;
        criteriaBuilder.where("author.id").eq(activityFilter.authorId());
    }

    private void filterPersons(final CriteriaBuilder<ActivityEntityView> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.personIds()) || activityFilter.personIds().isEmpty()) return;
        criteriaBuilder.where("persons.id").in(activityFilter.personIds());
    }

    private void filterLocations(final CriteriaBuilder<ActivityEntityView> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.locationIds()) || activityFilter.locationIds().isEmpty()) return;
        criteriaBuilder.where("locations.id").in(activityFilter.locationIds());
    }

    private void filterStartPostTime(final CriteriaBuilder<ActivityEntityView> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.startPostTime())) return;
        criteriaBuilder.where("postTime").ge(activityFilter.startPostTime());
    }

    private void filterEndPostTime(final CriteriaBuilder<ActivityEntityView> criteriaBuilder, final ActivityFilterDto activityFilter) {
        if (Objects.isNull(activityFilter.endPostTime())) return;
        criteriaBuilder.where("postTime").le(activityFilter.startPostTime());
    }
}
