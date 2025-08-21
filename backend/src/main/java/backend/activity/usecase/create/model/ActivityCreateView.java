package backend.activity.usecase.create.model;

import java.util.Date;
import java.util.List;

import backend.activity.model.Activity;
import backend.location.model.LocationIdView;
import backend.person.model.PersonIdView;
import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;



@EntityView(Activity.class)
@CreatableEntityView
public interface ActivityCreateView {

    @IdMapping
    Long getId();

    String getTitle();
    void setTitle(final String title);

    String getDescription();
    void setDescription(final String description);

    Date getPostTime();
    void setPostTime(final Date postTime);


    @Mapping("author")
    PersonIdView getAuthor();
    void setAuthor(final PersonIdView author);

    @Mapping("persons")
    List<PersonIdView> getPersons();
    void setPersons(final List<PersonIdView> persons);

    @Mapping("locations")
    List<LocationIdView> getLocations();
    void setLocations(final List<LocationIdView> persons);
}
