package com.example.keyboardmasters.controller;

import com.example.keyboardmasters.model.User;
import com.example.keyboardmasters.service.UserService;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String showDefaultPage() {
        return "index";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String register(User user, Model model) {
        try {
            userService.save(user);
            return "redirect:/login";
        } catch (DataIntegrityViolationException ex) {
            // add information to thymeleaf
            model.addAttribute("registerErrorMessage", "Username already taken");
            return "register";
        }
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }

    @GetMapping("/index")
    public String showSecondLoginForm() {
        return "index";
    }

    @GetMapping("/typing_training")
    public String showTypingTraining() {
        return "typing_training";
    }

    @GetMapping("/typing_test")
    public String showTypingTest() {
        return "typing_test";
    }

    @GetMapping("/themes")
    public String showThemes() {
        return "themes";
    }

    @GetMapping("/about")
    public String showAbout() {
        return "about";
    }

    @GetMapping("/change-password")
    public String changePasswordForm(Model model, Principal principal) {
        String username = principal.getName();
        User user = userService.findUserByUsername(username); // using new method
        model.addAttribute("user", user);
        return "change_password";
    }

    @PostMapping("/change-password")
    public String changePassword(User user) {
        userService.save(user); // Assumes userService.save can update existing users.
        return "redirect:/account";
    }

}