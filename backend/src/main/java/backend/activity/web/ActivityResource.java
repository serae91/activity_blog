package backend.activity.web;

import backend.activity.core.ActivityService;
import backend.activity.core.model.ActivityFilterDto;
import backend.activity.model.ActivityEntityView;
import backend.activity.usecase.create.ActivityCreateService;
import backend.activity.usecase.create.model.ActivityCreateView;
import backend.activity.usecase.delete.ActivityDeleteService;
import backend.activity.usecase.update.ActivityUpdateService;
import backend.activity.usecase.update.model.ActivityUpdateView;
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

@Path("/activity")
@ApplicationScoped
public class ActivityResource {

    @Inject
    ActivityService activityService;
    @Inject
    ActivityCreateService activityCreateService;
    @Inject
    ActivityUpdateService activityUpdateService;
    @Inject
    ActivityDeleteService activityDeleteService;

    @GET
    @Path("/{activityId}")
    @Produces(MediaType.APPLICATION_JSON)
    public ActivityEntityView getActivityById(@PathParam("activityId") final Long activityId) {
        return activityService.getActivityEntityViewById(activityId);
    }

    @POST
    @Path("/filtered")
    @Produces(MediaType.APPLICATION_JSON)
    public List<ActivityEntityView> getFilteredActivities(final ActivityFilterDto activityFilter) {
        return activityService.getFilteredActivityEntityViews(activityFilter);
    }

    @POST
    @Path("/create")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public ActivityEntityView createActivity(final ActivityCreateView activityCreateView) {
        activityCreateService.createActivity(activityCreateView);
        return activityService.getActivityEntityViewById(activityCreateView.getId());
    }

    @POST
    @Path("/update")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public ActivityEntityView updateActivity(final ActivityUpdateView activityUpdateView) {
        activityUpdateService.updateActivity(activityUpdateView);
        return activityService.getActivityEntityViewById(activityUpdateView.getId());
    }

    @DELETE
    @Path("/{activityId}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteActivityById(@PathParam("activityId") final Long activityId) {
        activityDeleteService.deleteActivityById(activityId);
    }
}
