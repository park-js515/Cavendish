package com.windows33.cavendish.global.jwt;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal {

    public String getLoginId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String loginId = ((UserDetails)principal).getUsername();

        return loginId;
    }

}
