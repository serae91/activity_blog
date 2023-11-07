package backend.location.usecase.create.model;

import lombok.Data;

@Data
public class CreateLocationDto {
    private String name;
    private String country;
    private String city;
    private Integer postalCode;
    private String street;
    private Integer streetNumber;
}
