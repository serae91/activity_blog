package backend.location.web;

import backend.location.model.Location;
import backend.location.usecase.create.model.CreateLocationDto;
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

@Path("/location")
@ApplicationScoped
public class LocationResource {

    @Inject
    LocationResourceFacade locationResourceFacade;

    @GET
    @Path("/{locationId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Location getActivityById(@PathParam("locationId") final Long locationId) {
        return locationResourceFacade.getLocationById(locationId);
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Location> getAllLocations() {
        return locationResourceFacade.getAllLocations();
    }

    @POST
    @Path("/new")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Location createNewLocation(final CreateLocationDto createLocationDto) {
        return locationResourceFacade.createNewLocation(createLocationDto);
    }

    @DELETE
    @Path("/{locationId}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void deletePersonById(@PathParam("locationId") final Long locationId) {
        locationResourceFacade.deleteLocationById(locationId);
    }
}
