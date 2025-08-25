package backend.location.usecase.delete;

import backend.activity.model.Activity;
import backend.location.model.Location;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Objects;

@ApplicationScoped
public class LocationDeleteService {
    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public void deleteLocationById(final Long locationId) {
        verifyLocationIsNotUsed(locationId);
        final Location activity = entityManager.find(Location.class, locationId);
        if (Objects.nonNull(activity)) {
            entityManager.remove(activity);
        }
    }

    private void verifyLocationIsNotUsed(final Long locationId) {
        if (0 < getActivityCount(locationId))
            throw new IllegalArgumentException("Can not delete location which is used in activity");
    }

    private Long getActivityCount(final Long locationId) {
        return criteriaBuilderFactory.create(entityManager, Long.class)
                .from(Activity.class)
                .select("COUNT(DISTINCT(id))")
                .where("locations.id").eq(locationId)
                .getSingleResult();
    }
}
