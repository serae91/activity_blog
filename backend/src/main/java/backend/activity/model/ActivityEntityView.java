package backend.activity.model;

import backend.location.model.LocationEntityView;
import backend.person.model.PersonEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.util.Date;
import java.util.Set;

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
    Set<PersonEntityView> getPersons();

    @Mapping("locations")
    Set<LocationEntityView> getLocations();
}
