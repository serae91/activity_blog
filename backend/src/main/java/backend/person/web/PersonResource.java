package backend.person.web;

import backend.person.core.PersonService;
import backend.person.core.listview.PersonListDto;
import backend.person.model.PersonEntityView;
import backend.person.usecase.create.PersonCreateService;
import backend.person.usecase.create.model.PersonCreateView;
import backend.person.usecase.delete.PersonDeleteService;
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
    PersonService personService;
    @Inject
    PersonCreateService personCreateService;
    @Inject
    PersonDeleteService deletePersonService;

    @GET
    @Path("/{personId}")
    @Produces(MediaType.APPLICATION_JSON)
    public PersonEntityView getPersonEntityViewById(@PathParam("personId") final Long personId) {
        return personService.getPersonEntityViewById(personId);
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PersonEntityView> getAllPersons() {
        return personService.getAllPersonEntityViews();
    }

    @GET
    @Path("/all/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<PersonListDto> getAllPersonListDtos() {
        return personService.getAllPersonListDtos();
    }

    @POST
    @Path("/new")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public PersonEntityView createNewPerson(final PersonCreateView personCreateView) {
        personCreateService.createNewPerson(personCreateView);
        return personService.getPersonEntityViewById(personCreateView.getId());
    }

    @DELETE
    @Path("/{personId}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void deletePersonById(@PathParam("personId") final Long personId) {
        deletePersonService.deletePersonById(personId);
    }
}
