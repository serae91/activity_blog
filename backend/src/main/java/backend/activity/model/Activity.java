package backend.activity.model;

import backend.location.model.Location;
import backend.person.model.Person;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

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

    @ManyToOne(targetEntity = Person.class, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private Person author;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @Column(name = "post_time", nullable = false)
    private Date postTime;

    @ManyToMany(targetEntity = Person.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "activity_person",
            joinColumns = {
                    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "person_id", referencedColumnName = "person_id")
            })
    private Set<Person> persons = new HashSet<>();

    @ManyToMany(targetEntity = Location.class, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinTable(name = "activity_location",
            joinColumns = {
                    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "location_id", referencedColumnName = "location_id")
            })
    private Set<Location> locations = new HashSet<>();
}
