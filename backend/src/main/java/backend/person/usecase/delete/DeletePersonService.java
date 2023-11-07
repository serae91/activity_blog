package backend.person.usecase.delete;

import backend.person.core.PersonRepository;
import jakarta.enterprise.context.Dependent;
import jakarta.inject.Inject;

@Dependent
public class DeletePersonService {
    @Inject
    PersonRepository personRepository;
    public void deletePersonById(final Long personId) {
        personRepository.deletePersonById(personId);
    }
}
