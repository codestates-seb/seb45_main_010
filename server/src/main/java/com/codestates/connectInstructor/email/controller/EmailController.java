package com.codestates.connectInstructor.email.controller;

import com.codestates.connectInstructor.email.service.EmailService;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/resetEmailSend/{email}")
    public String sendResetEmail(@PathVariable("email") String email) {
        emailService.sendResetEmail(email);

        return "email sent";
    }

    @GetMapping("/password/{encryptedPath}")
    public String resetPassword(@PathVariable("encryptedPath") String encryptedPath) {
        emailService.resetPassword(encryptedPath);

        return "비밀번호가 pass1234로 리셋되었습니다.";
    }
}
