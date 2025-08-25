package backend.location.usecase.update.model;

import backend.location.model.Location;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.UpdatableEntityView;

@EntityView(Location.class)
@UpdatableEntityView
public interface LocationUpdateView {
    @IdMapping
    Long getId();

    void setName(String name);

    String getName();

    void setCountry(String country);

    String getCountry();

    void setCity(String city);

    String getCity();

    void setPostalCode(Integer postalCode);

    Integer getPostalCode();

    void setStreet(String street);

    String getStreet();

    void setStreetNumber(Integer streetNumber);

    Integer getStreetNumber();
}
