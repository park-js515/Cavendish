import { useState } from "react";

export const useInput = (initialValue, validator, filterHangeul) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    let {
      target: { value },
    } = event;

    // filterdHangeul===true: 한글 필터링
    if (filterHangeul) {
      value = value.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
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
