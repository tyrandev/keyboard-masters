package com.example.keyboardmasters.service;

import com.example.keyboardmasters.repository.TypingTestRepository;
import com.example.keyboardmasters.repository.UserRepository;
import com.example.keyboardmasters.model.TypingTest;
import com.example.keyboardmasters.model.User;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypingTestService {

    @Autowired
    private TypingTestRepository typingTestRepository;

    public TypingTest save(TypingTest typingTest) {
        return typingTestRepository.save(typingTest);
    }

    public TypingTest getById(Long id) {
        return typingTestRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TypingTest not found with id : " + id));
    }

    public List<TypingTest> getByUserId(Long userId) {
        return typingTestRepository.findAllByUserId(userId);
    }

    // add more methods as needed
}