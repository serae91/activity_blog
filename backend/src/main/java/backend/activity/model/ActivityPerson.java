package backend.activity.model;

import backend.person.model.Person;
import io.quarkus.runtime.annotations.RegisterForReflection;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "activity_person")
@RegisterForReflection
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityPerson {

    @Id
    @GeneratedValue(generator = "activity_person_sequence", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "activity_person_sequence", sequenceName = "activity_person_sequence", allocationSize = 1)
    @Column(name = "activity_person_id", nullable = false)
    private Long activityPersonId;

    @ManyToOne(targetEntity = Activity.class, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @ManyToOne(targetEntity = Person.class, fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;
}
