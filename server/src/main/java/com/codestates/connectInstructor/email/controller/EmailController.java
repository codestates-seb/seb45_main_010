package com.codestates.connectInstructor.email.controller;

import com.codestates.connectInstructor.email.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/verify/{encryptedPath}")
    public String verifyEmail(@PathVariable("encryptedPath") String encryptedPath) {
        emailService.verifyEmail(encryptedPath);

        return "Your email has been authenticated!";
    }
}
