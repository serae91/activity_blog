package backend.person.model;

import backend.activity.model.Activity;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "person")
@RegisterForReflection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Person {
    @Id
    @GeneratedValue(generator = "person_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "person_sequence", sequenceName = "person_sequence", allocationSize = 1)
    @Column(name = "person_id", nullable = false)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @Column(name = "birthday", nullable = false)
    private Date birthday;

    @ManyToMany(targetEntity = Activity.class, fetch = FetchType.LAZY)
    @JoinTable(name = "activity_person",
            joinColumns = {
                    @JoinColumn(name = "author_id", referencedColumnName = "person_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
            })
    private List<Activity> activities = new ArrayList<>();
}
