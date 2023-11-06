package backend.activity.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class ActivityCreateDto {
    private Long authorId;
    private String title;
    private String description;
    private Date postTime;
    private List<Long> personIds;
}
