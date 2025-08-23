package backend.location.core;

import backend.activity.model.Activity;
import backend.location.core.listview.LocationListDto;
import backend.location.model.Location;
import backend.location.model.LocationEntityView;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@Dependent
public class LocationService {

    @Inject
    EntityManager entityManager;

    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public LocationEntityView getLocationById(final Long locationId) {
        return criteriaBuilderFactory.create(entityManager, LocationEntityView.class)
                .where("id").eq(locationId).getSingleResult();
    }

    public List<LocationEntityView> getAllLocationEntityViews() {
        return criteriaBuilderFactory.create(entityManager, LocationEntityView.class)
                .getResultList();
    }

    public List<LocationListDto> getAllLocationListDtos() {
        final List<Location> allLocations = getAllLocations();
        return allLocations.stream().map(this::getLocationListDto).toList();
    }

    private List<Location> getAllLocations() {
        return criteriaBuilderFactory.create(entityManager, Location.class)
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
