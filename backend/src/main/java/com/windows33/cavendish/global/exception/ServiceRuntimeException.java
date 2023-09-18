package com.windows33.cavendish.global.exception;


import org.apache.commons.lang3.StringUtils;

public abstract class ServiceRuntimeException extends RuntimeException {

    private final String errorType;
    private final String cause;
    private final Object[] params;

    public ServiceRuntimeException(String errorType, String cause, Object... params) {
        this.errorType = errorType;
        this.cause = cause;
        this.params = params;
    }

    @Override
    public String getMessage() {
        return new StringBuilder().append("ErrorType: ").append(errorType)
                .append("\nCaused By: ").append(cause)
                .append("\nParam: ").append(StringUtils.join(params, ",")).toString();
    }

}