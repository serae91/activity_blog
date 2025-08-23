package backend.person.core;

import backend.activity.model.Activity;
import backend.person.core.listview.PersonListDto;
import backend.person.model.Person;
import backend.person.model.PersonEntityView;
import com.blazebit.persistence.CriteriaBuilder;
import com.blazebit.persistence.CriteriaBuilderFactory;
import com.blazebit.persistence.view.EntityViewManager;
import com.blazebit.persistence.view.EntityViewSetting;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@Dependent
public class PersonService {
    @Inject
    EntityManager entityManager;
    @Inject
    EntityViewManager entityViewManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public PersonEntityView getPersonEntityViewById(final Long personId) {
        final CriteriaBuilder<Person> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Person.class)
                .where("id").eq(personId);
        return entityViewManager.applySetting(EntityViewSetting.create(PersonEntityView.class), criteriaBuilder).getSingleResult();
    }

    public List<PersonEntityView> getAllPersonEntityViews() {
        final CriteriaBuilder<Person> criteriaBuilder = criteriaBuilderFactory.create(entityManager, Person.class);
        return entityViewManager.applySetting(EntityViewSetting.create(PersonEntityView.class), criteriaBuilder).getResultList();
    }

    public List<PersonListDto> getAllPersonListDtos() {
        final List<Person> allPersons = getAllPersons();
        return allPersons.stream().map(this::getPersonListDto).toList();
    }

    private List<Person> getAllPersons() {
        return criteriaBuilderFactory.create(entityManager, Person.class)
                .getResultList();
    }

    private PersonListDto getPersonListDto(final Person person) {
        return PersonListDto.builder()
                .person(person)
                .activityCount(getActivityCount(person))
                .build();
    }

    private Long getActivityCount(final Person person) {
        return criteriaBuilderFactory.create(entityManager, Long.class)
                .from(Activity.class)
                .select("COUNT(DISTINCT(id))")
                .whereOr()
                .where("author.id").eq(person.getId())
                .where("persons.id").eq(person.getId())
                .endOr()
                .getSingleResult();
    }
}
