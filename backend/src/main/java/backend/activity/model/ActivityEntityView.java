package backend.activity.model;

import backend.location.model.LocationEntityView;
import backend.person.model.PersonEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.util.Date;
import java.util.List;

@EntityView(Activity.class)
public interface ActivityEntityView {
    @IdMapping
    Long getId();

    @Mapping("author")
    PersonEntityView getAuthor();

    String getTitle();

    String getDescription();

    Date getPostTime();

    @Mapping("persons")
    List<PersonEntityView> getPersons();

    @Mapping("locations")
    List<LocationEntityView> getLocations();
}
