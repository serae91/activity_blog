package backend.person.model;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(Person.class)
public interface PersonIdView {
    @IdMapping
    Long getId();
}
