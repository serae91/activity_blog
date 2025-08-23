package backend.person.usecase.create;

import backend.person.usecase.create.model.PersonCreateView;
import com.blazebit.persistence.view.EntityViewManager;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@Dependent
public class PersonCreateService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;

    public void createNewPerson(final PersonCreateView personCreateView) {
        entityViewManager.save(entityManager, personCreateView);
    }
}
