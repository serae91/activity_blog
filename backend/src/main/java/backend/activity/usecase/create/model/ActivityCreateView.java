package backend.activity.usecase.create.model;

import backend.activity.model.Activity;
import backend.location.model.LocationIdView;
import backend.person.model.PersonIdView;
import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.Mapping;

import java.util.Date;
import java.util.List;


@EntityView(Activity.class)
@CreatableEntityView
public interface ActivityCreateView {

    @IdMapping
    Long getId();

    String getTitle();

    void setTitle(String title);

    String getDescription();

    void setDescription(String description);

    Date getPostTime();

    void setPostTime(Date postTime);


    @Mapping("author")
    PersonIdView getAuthor();

    void setAuthor(PersonIdView author);

    @Mapping("persons")
    List<PersonIdView> getPersons();

    void setPersons(List<PersonIdView> persons);

    @Mapping("locations")
    List<LocationIdView> getLocations();

    void setLocations(List<LocationIdView> persons);
}
