package backend.person.usecase.create.model;

import backend.person.model.Person;
import com.blazebit.persistence.view.CreatableEntityView;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(Person.class)
@CreatableEntityView
public interface PersonCreateView {
    @IdMapping
    Long getId();

    void setFirstName(String firstName);

    String getFirstName();

    void setLastName(String lastName);

    String getLastName();

    void setBirthday(Date birthday);

    Date getBirthday();
}
