package com.example.keyboardmasters.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.keyboardmasters.model.TypingTest;

@Repository
public interface TypingTestRepository extends JpaRepository<TypingTest, Long> {

    List<TypingTest> findAllByUserId(Long userId);
}
