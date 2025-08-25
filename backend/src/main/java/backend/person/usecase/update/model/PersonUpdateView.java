package backend.person.usecase.update.model;

import backend.person.model.Person;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;
import com.blazebit.persistence.view.UpdatableEntityView;

import java.util.Date;

@EntityView(Person.class)
@UpdatableEntityView
public interface PersonUpdateView {
    @IdMapping
    Long getId();

    void setFirstName(String firstName);

    String getFirstName();

    void setLastName(String lastName);

    String getLastName();

    void setBirthday(Date birthday);

    Date getBirthday();
}
