package backend.location.model;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import jakarta.persistence.Column;

@EntityView(Location.class)
public interface LocationEntityView {

    @IdMapping
    Long getId();

    String getName();

    String getCountry();

    String getCity();

    Integer getPostalCode();

    String getStreet();

    Integer getStreetNumber();
}
