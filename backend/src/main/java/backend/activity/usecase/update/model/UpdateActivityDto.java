package backend.activity.usecase.update.model;

import java.util.List;

import lombok.Data;

@Data
public class UpdateActivityDto {
    private Long id;
    private Long authorId;
    private String title;
    private String description;
    private List<Long> personIds;
    private List<Long> locationIds;
}