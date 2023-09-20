package com.windows33.cavendish.global.response;

import lombok.Getter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.springframework.http.HttpStatus;

@Getter
public class CommonResponse<T> {

    private final boolean success;
    private final T response;
    private final ErrorResponse error;

    public CommonResponse(boolean success, T response, ErrorResponse error) {
        this.success = success;
        this.response = response;
        this.error = error;
    }

    public static <T> CommonResponse<T> OK(T response) {
        return new CommonResponse<>(true, response, null);
    }

    public static CommonResponse<?> ERROR(Throwable throwable, HttpStatus status) {
        return new CommonResponse<>(false, null, new ErrorResponse(throwable, status));
    }

    public static CommonResponse<?> ERROR(String errorMessage, HttpStatus status) {
        return new CommonResponse<>(false, null, new ErrorResponse(errorMessage, status));
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE)
                .append("success", success)
                .append("response", response)
                .append("error", error)
                .toString();
    }

}
