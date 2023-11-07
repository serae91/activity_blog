package backend.person.core;

import backend.person.model.Person;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;
import java.util.Optional;

@Dependent
public class PersonService {
    @Inject
    PersonRepository personRepository;
    public Person getPersonById(final Long personId) {
        final Optional<Person> optionalPerson = personRepository.findByIdOptional(personId);
        if(optionalPerson.isPresent()) {
            return optionalPerson.get();
        }
        return null;
    }

    public List<Person> getAllPersons() {
        return personRepository.getAllPersons();
    }
}
