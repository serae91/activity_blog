package backend.activity.usecase.update.model;

import backend.activity.core.model.ActivityEntityView;
import backend.activity.model.Activity;
import backend.location.model.LocationIdView;
import backend.person.model.PersonIdView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.Mapping;
import com.blazebit.persistence.view.UpdatableEntityView;

import java.util.List;

@EntityView(Activity.class)
@UpdatableEntityView
public interface ActivityUpdateView extends ActivityEntityView {

    void setTitle(String title);

    void setDescription(String description);

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