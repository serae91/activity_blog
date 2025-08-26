package backend.location.core;

import backend.activity.model.Activity;
import backend.location.core.listview.LocationListDto;
import backend.location.model.Location;
import backend.location.model.LocationEntityView;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.EntityViewSetting;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@Dependent
public class LocationService {

    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public LocationEntityView getLocationEntityViewById(final Long locationId) {
        final CriteriaBuilder<Location> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Location.class)
                .where("id").eq(locationId);
        return entityViewManager.applySetting(EntityViewSetting.create(LocationEntityView.class), criteriaBuilder).getSingleResult();
    }

    public List<LocationEntityView> getAllLocationEntityViews() {
        final CriteriaBuilder<Location> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Location.class).orderByAsc("name");
        return entityViewManager.applySetting(EntityViewSetting.create(LocationEntityView.class), criteriaBuilder).getResultList();
    }

    public List<LocationListDto> getAllLocationListDtos() {
        final List<Location> allLocations = getAllLocations();
        return allLocations.stream().map(this::getLocationListDto).toList();
    }

    private List<Location> getAllLocations() {
        return criteriaBuilderFactory.create(entityManager, Location.class).orderByAsc("name")
                .getResultList();
    }

    private LocationListDto getLocationListDto(final Location location) {
        return LocationListDto.builder()
                .location(location)
                .activityCount(getActivityCount(location))
                .build();
    }

    private Long getActivityCount(final Location location) {
        return criteriaBuilderFactory.create(entityManager, Long.class)
                .from(Activity.class)
                .select("COUNT(DISTINCT(id))")
                .where("locations.id").eq(location.getId())
                .getSingleResult();
    }
}
