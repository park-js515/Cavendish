package com.windows33.cavendish.global.response;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.http.HttpStatus;

public class ErrorResponse {

    private final String message;

    private final int status;

    ErrorResponse(Throwable throwable, HttpStatus status) {
        this.message = throwable.getMessage();
        this.status = status.value();
    }

    ErrorResponse(String message, HttpStatus status) {
        this.message = message;
        this.status = status.value();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("message", message)
                .append("status", status)
                .toString();
    }

}
