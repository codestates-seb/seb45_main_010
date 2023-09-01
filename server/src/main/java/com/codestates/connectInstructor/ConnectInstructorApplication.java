package com.codestates.connectInstructor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
		(exclude = SecurityAutoConfiguration.class)
@EnableAsync
@EnableJpaAuditing
public class ConnectInstructorApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConnectInstructorApplication.class, args);
	}

}
