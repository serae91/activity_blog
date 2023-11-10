package backend.activity.usecase.create.model;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class CreateActivityDto {
    private Long authorId;
    private String title;
    private String description;
    private Date postTime;
    private List<Long> personIds;
    private List<Long> locationIds;
}
