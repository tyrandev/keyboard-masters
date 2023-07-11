package com.example.keyboardmasters.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.keyboardmasters.model.TypingTest;

@Repository
public interface TypingTestRepository extends JpaRepository<TypingTest, Long> {

    List<TypingTest> findAllByUserId(Long userId);

    @Query(value = "SELECT u.username, MAX(t.clean_typing_speed) as best_typing_speed " +
            "FROM typing_test t JOIN user u ON t.user_id = u.id " +
            "GROUP BY u.username " +
            "ORDER BY best_typing_speed DESC", nativeQuery = true)
    List<Object[]> findUsersWithBestTypingSpeed();
}
