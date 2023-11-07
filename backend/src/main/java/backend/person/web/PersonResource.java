package backend.person.web;

import backend.person.model.Person;
import backend.person.usecase.create.model.CreatePersonDto;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/person")
@ApplicationScoped
public class PersonResource {
    @Inject
    PersonResourceFacade personResourceFacade;

    @GET
    @Path("/{personId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Person getPersonById(@PathParam("personId") final Long personId) {
        return personResourceFacade.getPersonById(personId);
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Person> getAllActivities() {
        return personResourceFacade.getAllPersons();
    }

    @POST
    @Path("/new")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Person createNewPerson(final CreatePersonDto createPersonDto) {
        return personResourceFacade.createNewPerson(createPersonDto);
    }

    @DELETE
    @Path("/{personId}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void deletePersonById(@PathParam("personId") final Long personId) {
        personResourceFacade.deletePersonById(personId);
    }
}
