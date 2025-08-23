package backend.person.usecase.delete;

import backend.person.model.Person;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Objects;

@Dependent
public class PersonDeleteService {
    @Inject
    EntityManager entityManager;

    public void deletePersonById(final Long personId) {
        final Person activity = entityManager.find(Person.class, personId);
        if (Objects.nonNull(activity)) {
            entityManager.remove(activity);
        }
    }
}
