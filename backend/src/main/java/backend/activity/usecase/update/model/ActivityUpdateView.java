package backend.activity.usecase.update.model;

import backend.activity.model.Activity;
import backend.location.model.LocationIdView;
import backend.person.model.PersonIdView;
import com.blazebit.persistence.view.CascadeType;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.UpdatableEntityView;
import com.blazebit.persistence.view.UpdatableMapping;

import java.util.Set;

@EntityView(Activity.class)
@UpdatableEntityView
public interface ActivityUpdateView {

    @IdMapping
    Long getId();

    String getTitle();

    void setTitle(String title);

    String getDescription();

    void setDescription(String description);

    PersonIdView getAuthor();

    void setAuthor(PersonIdView author);

    @UpdatableMapping(cascade = CascadeType.DELETE, orphanRemoval = true)
    Set<PersonIdView> getPersons();

    void setPersons(Set<PersonIdView> persons);

    @UpdatableMapping(cascade = CascadeType.DELETE, orphanRemoval = true)
    Set<LocationIdView> getLocations();

    void setLocations(Set<LocationIdView> locations);
}
