package com.codestates.connectInstructor.security.member;

import java.util.List;

public interface Member {
    long getId();
    String getEmail();
    List<String> getRoles();

}
