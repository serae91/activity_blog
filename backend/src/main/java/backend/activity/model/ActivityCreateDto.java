package backend.activity.model;

import java.util.Date;
import lombok.Data;

@Data
public class ActivityCreateDto {
    private String title;
    private String description;
    private Date postTime;
}
