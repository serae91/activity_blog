package backend.person.web;

import backend.person.core.PersonService;
import backend.person.core.listview.PersonListDto;
import backend.person.model.Person;
import backend.person.usecase.create.CreatePersonService;
import backend.person.usecase.create.model.CreatePersonDto;
import backend.person.usecase.delete.DeletePersonService;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

import java.util.List;

@Dependent
public class PersonResourceFacade {
    @Inject
    PersonService personService;
    @Inject
    CreatePersonService createPersonService;
    @Inject
    DeletePersonService deletePersonService;
    public Person getPersonById(final Long personId) {
        return personService.getPersonById(personId);
    }

    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }
    public List<PersonListDto> getAllPersonListDtos() {
        return personService.getAllPersonListDtos();
    }

    public Person createNewPerson(final CreatePersonDto createPersonDto) {
        return createPersonService.createNewPerson(createPersonDto);
    }

    public void deletePersonById(final Long personId) {
        deletePersonService.deletePersonById(personId);
    }
}
