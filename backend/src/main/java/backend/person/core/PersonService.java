package backend.person.core;

import backend.activity.model.Activity;
import backend.person.core.listview.PersonListDto;
import backend.person.model.Person;
import backend.person.model.PersonEntityView;
import com.blazebit.persistence.CriteriaBuilderFactory;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@Dependent
public class PersonService {
    @Inject
    EntityManager entityManager;
    @Inject
    CriteriaBuilderFactory criteriaBuilderFactory;

    public PersonEntityView getPersonEntityViewById(final Long personId) {
        return criteriaBuilderFactory.create(entityManager, PersonEntityView.class)
                .where("id").eq(personId).getSingleResult();
    }

    public List<PersonEntityView> getAllPersonEntityViews() {
        return criteriaBuilderFactory.create(entityManager, PersonEntityView.class)
                .getResultList();
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
        return criteriaBuilderFactory.create(entityManager, Long.class).from(Activity.class).select("COUNT(id)").where("persons.id").eq(person.getId()).getSingleResult();
    }
}
