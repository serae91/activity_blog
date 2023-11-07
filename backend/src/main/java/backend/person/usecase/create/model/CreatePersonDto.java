package backend.person.usecase.create.model;

import lombok.Data;

import java.util.Date;

@Data
public class CreatePersonDto {
    private String firstName;
    private String lastName;
    private Date birthday;
}
