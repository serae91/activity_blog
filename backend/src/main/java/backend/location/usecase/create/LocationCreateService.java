package backend.location.usecase.create;

import backend.location.usecase.create.model.LocationCreateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@Dependent
public class LocationCreateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void createLocation(final LocationCreateView locationCreateView) {
        entityViewManager.save(entityManager, locationCreateView);
    }
}
