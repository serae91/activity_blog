package backend.activity.usecase.create.model;

import backend.activity.model.Activity;
import backend.location.model.LocationIdView;
import backend.person.model.PersonIdView;
import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

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

    PersonIdView getAuthor();

    void setAuthor(PersonIdView author);

    List<PersonIdView> getPersons();

    void setPersons(List<PersonIdView> persons);

    List<LocationIdView> getLocations();

    void setLocations(List<LocationIdView> persons);
}
