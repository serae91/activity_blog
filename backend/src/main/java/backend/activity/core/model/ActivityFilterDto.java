package backend.activity.core.model;

import java.util.Date;
import java.util.List;

public record ActivityFilterDto(Long authorId, List<Long> personIds, List<Long> locationIds, Date startPostTime,
                                Date endPostTime) {
}
