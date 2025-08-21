package backend.activity.web;

import backend.activity.core.ActivityService;
import backend.activity.model.Activity;
import backend.activity.model.ActivityEntityView;
import backend.activity.usecase.create.ActivityCreateService;
import backend.activity.usecase.create.model.ActivityCreateView;
import backend.activity.usecase.delete.DeleteActivityService;
import backend.activity.usecase.update.UpdateActivityService;
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
    UpdateActivityService updateActivityService;
    @Inject
    DeleteActivityService deleteActivityService;

    @GET
    @Path("/{activityId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Activity getActivityById(@PathParam("activityId") final Long activityId) {
        return activityService.getActivityById(activityId);
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @POST
    @Path("/create")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public ActivityEntityView createActivity(final ActivityCreateView activityCreateView) {
        return activityCreateService.createActivity(activityCreateView);
    }

    @POST
    @Path("/update")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public ActivityEntityView updateActivity(final ActivityUpdateView activityUpdateView) {
        return updateActivityService.updateActivity(activityUpdateView);
    }

    @DELETE
    @Path("/{activityId}")
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public void deleteActivityById(@PathParam("activityId") final Long activityId) {
        deleteActivityService.deleteActivityById(activityId);
    }
}