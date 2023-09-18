package rs.raf.demo.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "machines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Name is mandatory.")
    private String name;

    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    private User createdBy;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private LocalDate creationDate;

//    @Column
//    @Version
//    private Integer version = 0;
}
