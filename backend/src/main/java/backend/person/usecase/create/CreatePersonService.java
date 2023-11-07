package backend.person.usecase.create;

import backend.person.core.PersonRepository;
import backend.person.model.Person;
import backend.person.usecase.create.model.CreatePersonDto;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class CreatePersonService {
    @Inject
    PersonRepository personRepository;

    public Person createNewPerson(final CreatePersonDto createPersonDto) {
        final Person newPerson = Person.builder()
                .firstName(createPersonDto.getFirstName())
                .lastName(createPersonDto.getLastName())
                .birthday(createPersonDto.getBirthday())
                .build();
        return personRepository.createNewPerson(newPerson);
    }
}
