package backend.person.core.listview;

import backend.person.model.Person;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PersonListDto {
    final Person person;
    final Boolean canBeDeleted;
}
