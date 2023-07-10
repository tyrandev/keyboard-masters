package com.example.keyboardmasters.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        int maximumSessionNumber = 99999;
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/", "/register").permitAll() // Allow access to root URL and register page
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/admin/*").hasRole("ADMIN")
                .antMatchers("/admin").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/welcome", true)
                .permitAll()
                .and()
                .formLogin()
                .loginPage("/index")
                .defaultSuccessUrl("/welcome", true)
                .permitAll()
                .and()
                .logout()
                .permitAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .invalidSessionUrl("/invalidSession")
                .maximumSessions(maximumSessionNumber)
                .expiredUrl("/sessionExpired");

    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}