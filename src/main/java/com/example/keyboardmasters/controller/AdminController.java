package com.example.keyboardmasters.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.keyboardmasters.model.User;
import com.example.keyboardmasters.service.UserService;

@Controller
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/admin")
    public String admin(Model model) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users); 
        return "admin";
    }
}