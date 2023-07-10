package com.example.keyboardmasters.model;

import javax.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypingTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private int timeInSeconds;
    private double cleanTypingSpeed;
    private double rawTypingSpeed;
    private double accuracy;
    private int allWords;
    private int incorrectWords;
    private int allLetters;
    private int incorrectLetters;
}