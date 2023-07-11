package com.example.keyboardmasters.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.keyboardmasters.model.TypingTest;
import com.example.keyboardmasters.model.User;
import com.example.keyboardmasters.service.TypingTestService;
import com.example.keyboardmasters.service.UserService;

@Controller
public class TypingTestController {

    @Autowired
    private TypingTestService typingTestService;

    @Autowired
    private UserService userService;

    @PostMapping("/users/{userId}/typing-tests")
    public String addTypingTest(@PathVariable Long userId, TypingTest typingTest) {
        User user = userService.findById(userId); // Assuming this method is there in UserService
        typingTest.setUser(user);
        typingTestService.save(typingTest);
        return "redirect:/users/" + userId; // Assuming you have a user details page
    }

    @PostMapping("/typing-test")
    public String saveTypingTest(@RequestBody TypingTest typingTest, Principal principal) {
        // Load the currently authenticated user
        String username = principal.getName();
        User user = userService.findUserByUsername(username);

        // Set the user for the typing test
        typingTest.setUser(user);

        // Save the typing test
        typingTestService.save(typingTest);

        return "typing_test";
    }

    @GetMapping("/typing-test")
    public String typingTestForm(Model model) {
        model.addAttribute("typingTest", new TypingTest());
        return "typing_test";
    }

    // add more methods as needed
}