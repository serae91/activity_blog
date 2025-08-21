package backend.person.model;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(Person.class)
public interface PersonEntityView {

    @IdMapping
    Long getId();

    String getFirstName();

    String getLastName();

    Date getBirthday();
}
