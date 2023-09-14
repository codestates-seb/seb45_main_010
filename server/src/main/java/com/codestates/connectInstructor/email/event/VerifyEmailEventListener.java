package com.codestates.connectInstructor.email.event;

import com.codestates.connectInstructor.email.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import javax.mail.internet.MimeMessage;

@Component
@Slf4j
public class VerifyEmailEventListener {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private EmailService emailService;

    @TransactionalEventListener
    @Async
    public void sendEmail(VerifyEmailEvent event) throws InterruptedException {
        String name = event.getName();
        String email = event.getEmail();
        String encryptedPath = emailService.encodePath(email, name);

        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();

            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject("ConnecT 인증 메일입니다.");

            //TODO 이후에 배포 링크로 바꾸기
            String body = "안녕하세요. "
                    .concat("<b>").concat(name).concat("</b> 님<br>")
                    .concat("ConnecT 서비스의 회원가입을 위한 인증메일입니다.<br>")
                    .concat("아래 링크를 클릭하여 이메일 인증을 완료해 주세요..<br><br>")
                    .concat("<a href=\"http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080/email/verify/")
                    .concat(encryptedPath)
                    .concat("\">이메일 인증하기</a>");


            mimeMessageHelper.setText(body, true);

            javaMailSender.send(mimeMessage);

            log.info("##### 인증용 이메일을 전송했습니다");
        } catch (Exception e) {
            log.error("##### 인증용 이메일 전송해 실패했습니다.");
        }

    }
}
