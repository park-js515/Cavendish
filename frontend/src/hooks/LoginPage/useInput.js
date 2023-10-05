import { useState } from "react";
import Swal from "sweetalert2";

export const useInput = (initialValue, validator, filterHangeul) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    let {
      target: { value },
    } = event;

    // filterdHangeul===true: 한글 필터링
    // 추후 아스키코드로 필터링하는 것도 고려해보자. 아니면 관련 라이브러리를 찾아보자.
    if (filterHangeul) {
      const before = value.length;
      value = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
      const after = value.length;

      if (before !== after) {
        Swal.fire({
          icon: "warning",
          title: "회원가입 에러",
          text: "아이디에 한글은 입력할 수 없습니다!",
        });
      }
    }
    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  };

  return [value, onChange];
};
