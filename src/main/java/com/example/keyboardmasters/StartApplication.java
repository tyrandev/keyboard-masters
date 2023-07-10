package com.example.keyboardmasters;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.keyboardmasters.model.User;
import com.example.keyboardmasters.service.UserService;

@SpringBootApplication
public class StartApplication {

	public static void main(String[] args) {
		SpringApplication.run(StartApplication.class, args);
	}

	@Bean
	public CommandLineRunner setupDefaultUser(UserService userService, BCryptPasswordEncoder passwordEncoder) {
		return args -> {
			if (userService.findByUsername("admin") == null) {
				User admin = new User("admin", "admin", "ROLE_ADMIN");
				userService.save(admin);
				User user = new User("user", "user", "ROLE_USER");
				userService.save(user);
			}
		};
	}

}
