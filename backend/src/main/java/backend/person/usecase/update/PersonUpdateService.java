package backend.person.usecase.update;

import backend.person.usecase.update.model.PersonUpdateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class PersonUpdateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void updatePerson(final PersonUpdateView personUpdateView) {
        entityViewManager.save(entityManager, personUpdateView);
    }
}
