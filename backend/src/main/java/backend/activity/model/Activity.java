package backend.activity.model;

import backend.person.model.Person;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "activity")
@RegisterForReflection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {
    @Id
    @GeneratedValue(generator = "activity_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "activity_sequence", sequenceName = "activity_sequence", allocationSize = 1)
    @Column(name = "activity_id", nullable = false)
    private Long id;

    @JoinColumn(name = "author_id", nullable = false)
    @OneToOne
    private Person author;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @Column(name = "post_time", nullable = false)
    private Date postTime;

    @ManyToMany(targetEntity = Person.class, fetch = FetchType.LAZY)
    @JoinTable(name = "activity_person",
            joinColumns = {
                    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "author_id", referencedColumnName = "person_id")
            })
    private List<Person> persons = new ArrayList<>();
}
