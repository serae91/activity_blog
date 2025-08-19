package backend.location.model;

import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

@EntityView(Location.class)
public interface LocationIdView {
    @IdMapping
    Long getId();
}
