package backend.person.core;

import backend.person.core.listview.PersonListDto;
import backend.person.model.Person;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class PersonRepository implements PanacheRepository<Person> {
    public Optional<Person> getByPersonId(final Long personId) {
        return findByIdOptional(personId);
    }

    public List<Person> getAllPersons() {
        return listAll();
    }

    public Person createNewPerson(final Person person) {
        persist(person);
        return person;
    }

    public void deletePersonById(final Long personId) {
        deleteById(personId);
    }
}
