package backend.person.usecase.delete;

import backend.activity.model.Activity;
import backend.person.model.Person;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.Objects;

@Dependent
public class PersonDeleteService {
    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public void deletePersonById(final Long personId) {
        verifyPersonIsNotUsed(personId);
        final Person activity = entityManager.find(Person.class, personId);
        if (Objects.nonNull(activity)) {
            entityManager.remove(activity);
        }
    }

    private void verifyPersonIsNotUsed(final Long personId) {
        if (0 < getActivityCount(personId))
            throw new IllegalArgumentException("Can not delete person which is used in activity");
    }

    private Long getActivityCount(final Long personId) {
        return criteriaBuilderFactory.create(entityManager, Long.class)
                .from(Activity.class)
                .select("COUNT(DISTINCT(id))")
                .whereOr()
                .where("author.id").eq(personId)
                .where("persons.id").eq(personId)
                .endOr()
                .getSingleResult();
    }
}
