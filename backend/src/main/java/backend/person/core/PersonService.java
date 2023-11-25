package backend.person.core;

import backend.activity.core.ActivityPersonRepository;
import backend.activity.core.ActivityRepository;
import backend.activity.model.Activity;
import backend.activity.model.ActivityPerson;
import backend.person.core.listview.PersonListDto;
import backend.person.model.Person;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;

@Dependent
public class PersonService {
    @Inject
    PersonRepository personRepository;
    @Inject
    ActivityRepository activityRepository;
    @Inject
    ActivityPersonRepository activityPersonRepository;
    public Person getPersonById(final Long personId) {
        final Optional<Person> optionalPerson = personRepository.findByIdOptional(personId);
        return optionalPerson.orElse(null);
    }

    public List<Person> getAllPersons() {
        return personRepository.getAllPersons();
    }

    public List<Person> getPersonsForPersonIds(final List<Long> personIds) {
        return personIds.stream().map(this::getPersonById).toList();
    }
    public List<PersonListDto> getAllPersonListDtos() {
        final List<Person> allPersons = getAllPersons();
        return allPersons.stream().map(this::getPersonListDto).toList();
    }

    private PersonListDto getPersonListDto(final Person person) {
        final List<ActivityPerson> activityPersonsForPerson = activityPersonRepository.getAllActivityPersonsForPerson(person.getId());
        final List<Activity> activitiesForAuthor = activityRepository.getAllActivitiesForAuthor(person.getId());
        final Boolean canBeDeleted = activityPersonsForPerson.isEmpty() && activitiesForAuthor.isEmpty();
        return PersonListDto.builder()
                .person(person)
                .canBeDeleted(canBeDeleted)
                .build();
    }
}
