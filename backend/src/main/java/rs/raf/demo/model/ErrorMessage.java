package rs.raf.demo.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "errors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private String operation;

    @Column(nullable = false)
    private LocalDate creationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    private Machine machine;
}
