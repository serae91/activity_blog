package backend.location.usecase.update;

import backend.location.usecase.update.model.LocationUpdateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class LocationUpdateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void updateLocation(final LocationUpdateView locationUpdateView) {
        entityViewManager.save(entityManager, locationUpdateView);
    }
}
