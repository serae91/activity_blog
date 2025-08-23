package backend.location.web;

import backend.location.core.LocationService;
import backend.location.core.listview.LocationListDto;
import backend.location.model.LocationEntityView;
import backend.location.usecase.create.LocationCreateService;
import backend.location.usecase.create.model.LocationCreateView;
import backend.location.usecase.delete.LocationDeleteService;
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
    LocationService locationService;
    @Inject
    LocationCreateService locationCreateService;
    @Inject
    LocationDeleteService locationDeleteService;

    @GET
    @Path("/{locationId}")
    @Produces(MediaType.APPLICATION_JSON)
    public LocationEntityView getLocationEntityViewById(@PathParam("locationId") final Long locationId) {
        return locationService.getLocationById(locationId);
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<LocationEntityView> getAllLocationEntityViews() {
        return locationService.getAllLocationEntityViews();
    }

    @GET
    @Path("/all/list")
    @Produces(MediaType.APPLICATION_JSON)
    public List<LocationListDto> getAllLocationListDtos() {
        return locationService.getAllLocationListDtos();
    }

    @POST
    @Path("/create")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public LocationEntityView createLocation(final LocationCreateView locationCreateView) {
        locationCreateService.createLocation(locationCreateView);
        return locationService.getLocationById(locationCreateView.getId());
    }

    @DELETE
    @Path("/{locationId}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteLocationById(@PathParam("locationId") final Long locationId) {
        locationDeleteService.deleteLocationById(locationId);
    }
}
