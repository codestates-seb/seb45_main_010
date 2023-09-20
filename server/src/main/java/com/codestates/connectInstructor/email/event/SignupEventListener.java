package com.codestates.connectInstructor.email.event;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;

@Component
@Slf4j
public class SignupEventListener {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

    @TransactionalEventListener
    @Async
    public void sendEmail(SignupEvent event) throws InterruptedException {
        String name = event.getName();
        String email = event.getEmail();

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("ConnecT 회원 가입을 축하합니다!");

            Context context = new Context();

            context.setVariable("name", name);
            context.setVariable("site", "www.connect-x10.shop");

            String html = templateEngine.process("Welcome", context);

            mimeMessageHelper.setText(html, true);

            javaMailSender.send(mimeMessage);

            log.info("##### 이메일을 전송했습니다");
        } catch (Exception e) {
            log.error("##### 이메일 전송해 실패했습니다.");
        }
    }
}
