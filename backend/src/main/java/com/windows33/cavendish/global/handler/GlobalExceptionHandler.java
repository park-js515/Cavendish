package com.windows33.cavendish.global.handler;

import com.windows33.cavendish.global.exception.InvalidException;
import com.windows33.cavendish.global.exception.ServiceRuntimeException;
import com.windows33.cavendish.global.response.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private ResponseEntity<CommonResponse<?>> newResponse(Throwable throwable, HttpStatus status) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        return new ResponseEntity<>(CommonResponse.ERROR(throwable, status), headers, status);
    }

    @ExceptionHandler(InvalidException.class)
    public ResponseEntity<?> handleInvalidException(InvalidException e) {
        log.error("Unexpected service exception occurred: {}", e.getMessage(), e);
        return newResponse(e, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ServiceRuntimeException.class)
    public ResponseEntity<?> handleServiceRuntimeException(ServiceRuntimeException e) {
        log.error("Unexpected service exception occurred: {}", e.getMessage(), e);
        return newResponse(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> test(Exception e) {
//        log.error("Unexpected service exception occurred: {}", e.getMessage(), e);
//        return newResponse(e, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

    @GetMapping("/error")
    public ResponseEntity<?> notFoundException(NoHandlerFoundException e){
        return newResponse(e, HttpStatus.NOT_FOUND);
    }

}
