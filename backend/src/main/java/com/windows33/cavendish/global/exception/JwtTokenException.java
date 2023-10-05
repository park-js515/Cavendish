package com.windows33.cavendish.global.exception;

public class JwtTokenException extends RuntimeException {

    public JwtTokenException(String message){
        super(message);
    }

}
