package backend.location.core.listview;

import backend.location.model.Location;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LocationListDto {
    final Location location;
    final Boolean canBeDeleted;
}
