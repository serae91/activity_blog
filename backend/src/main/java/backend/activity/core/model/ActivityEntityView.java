package backend.activity.core.model;

import backend.activity.model.Activity;
import com.blazebit.persistence.view.EntityView;
import com.blazebit.persistence.view.IdMapping;

import java.util.Date;

@EntityView(Activity.class)
public interface ActivityEntityView {
    @IdMapping
    Long getId();
    String getTitle();
    String getDescription();
    Date getPostTime();
}
