package com.example.keyboardmasters.controller;

import com.example.keyboardmasters.model.User;
import com.example.keyboardmasters.service.UserService;
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

    @GetMapping("/account")
    public String welcome() {
        return "account";
    }

}