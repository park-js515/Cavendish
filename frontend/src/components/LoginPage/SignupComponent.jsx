import InputComponent from "./InputComponent";

const idLowerBound = 6;
const pwLowerBound = 4;
const nickLowerBound = 2;

const SignupList_origin = [
  {
    name: "ID",
    type: "text",
    placeholder: "ID(EN)*",
    addBtn: {
      flag: true,
      content: "중복검사",
      onClick: () => {},
      disabled: true,
      custom_onChange: () => {},
      className: "input-item-btn-before-ignore",
    },
    addText: { text: "", className: "" },
  },
  {
    name: "PW1",
    type: "password",
    placeholder: "Password*",
    addBtn: { flag: false, custom_onChange: () => {} },
    addText: { text: "", className: "input-text-red" },
  },
  {
    name: "PW2",
    type: "password",
    placeholder: "Password Check*",
    addBtn: { flag: false, custom_onChange: () => {} },
    addText: { text: "", className: "" },
  },
  {
    name: "nickname",
    type: "text",
    placeholder: "Nickname*",
    addBtn: {
      flag: true,
      content: "중복검사",
      onClick: () => {},
      disabled: true,
      custom_onChange: () => {},
      className: "input-item-btn-before-ignore",
    },
    addText: { text: "", className: "" },
  },
];

let SignupList = [];

const resetSignupList = () => {
  const item0 = SignupList_origin[0];
  const item1 = SignupList_origin[1];
  const item2 = SignupList_origin[2];
  const item3 = SignupList_origin[3];

  SignupList = [{ ...item0 }, { ...item1 }, { ...item2 }, { ...item3 }];
};
resetSignupList();

const dummy = [
  { id: "adminNo1", password: "1234" },
  { id: "adminNo2", password: "1234" },
];

const SignupComponent = ({ list, checkList }) => {
  // 0
  // 입력0: ID
  const onChange0 = (event) => {
    const val = event.target.value;

    checkList[0].setCheck(false); // 변화가 있는 경우 유효성을 false
    SignupList[0].addBtn.content = "중복검사";

    if (val.length === 0) {
      SignupList[0].addBtn.disabled = true;
      SignupList[0].addText.text = "";
      SignupList[0].addBtn.className = "input-item-btn-before-ignore";
      return;
    }

    if (val.length < idLowerBound) {
      SignupList[0].addBtn.disabled = true;
      SignupList[0].addBtn.className = "input-item-btn-before-ignore";
      SignupList[0].addText.text = "❗ 입력이 너무 짧습니다.";
      SignupList[0].addText.className = "input-text-red";
    } else {
      SignupList[0].addBtn.disabled = false;
      SignupList[0].addBtn.className = "input-item-btn-before";
      SignupList[0].addText.text = "";
      SignupList[0].addText.className = "";
    }
  };

  // 클릭0: axios(ID 유효성 검사)
  const onClick0 = () => {
    if (
      dummy.some((item) => {
        return item.id === list[0].value;
      })
    ) {
      // 중복이 있는 경우 -> 지금 이 경우가 보이지 않는다.
      SignupList[0].addText.text = "❗ 이미 존재하는 ID입니다.";
      SignupList[0].addText.className = "input-text-red";
      checkList[0].setCheck(false); // 기존의 값과 변동이 없기에 re-rendering이 일어나지 않음.
      checkList[4].setCheck((current) => {
        // 더미 변수를 업데이트함으로써 이를 해결함.
        return current + 1;
      });
    } else {
      // 중복이 없는 경우
      SignupList[0].addBtn.content = "✔";
      SignupList[0].addBtn.className = "input-item-btn-after";
      SignupList[0].addText.text = "✔ 사용이 가능한 ID입니다.";
      SignupList[0].addText.className = "input-text-green";
      checkList[0].setCheck(true);
    }
  };

  SignupList[0].addBtn.custom_onChange = onChange0;
  SignupList[0].addBtn.onClick = onClick0;

  // 입력1: PW1
  const onChange1 = (event) => {
    const val = event.target.value;

    if (val.length === 0) {
      SignupList[1].addText.text = "";
      SignupList[2].addText.text = "";
      checkList[1].setCheck(false);
      return;
    }

    if (val.length < pwLowerBound) {
      SignupList[1].addText.text = "❗ 입력이 너무 짧습니다.";
      SignupList[2].addText.text = "";
      checkList[1].setCheck(false);
    } else {
      SignupList[1].addText.text = "";
      checkList[1].setCheck(true);

      if (val === list[2].value) {
        SignupList[2].addText.text = "✔ 일치합니다.";
        SignupList[2].addText.className = "input-text-green";
        checkList[2].setCheck(true);
      } else {
        SignupList[2].addText.text = "";
        checkList[2].setCheck(false);
      }
    }
  };

  SignupList[1].addBtn.custom_onChange = onChange1;

  // 입력2: PW2
  const onChange2 = (event) => {
    const val = event.target.value;

    if (val.length > 0 && list[1].value.length < pwLowerBound) {
      SignupList[2].addText.text = "❗ 위의 입력이 이뤄지지 않았습니다.";
      SignupList[2].addText.className = "input-text-red";
      checkList[2].setCheck(false);
      return;
    }

    if (val.length === 0) {
      SignupList[2].addText.text = "";
      checkList[2].setCheck(false);
      return;
    }

    if (val === list[1].value) {
      SignupList[2].addText.text = "✔ 일치합니다.";
      SignupList[2].addText.className = "input-text-green";
      checkList[2].setCheck(true);
    } else {
      SignupList[2].addText.text = "❗ 일치하지 않습니다.";
      SignupList[2].addText.className = "input-text-red";
      checkList[2].setCheck(false);
    }
  };

  SignupList[2].addBtn.custom_onChange = onChange2;

  // 3
  const onChange3 = (event) => {
    const val = event.target.value;

    checkList[3].setCheck(false); // 변화가 있는 경우 유효성을 false
    SignupList[3].addBtn.content = "중복검사";

    if (val.length === 0) {
      SignupList[3].addBtn.disabled = true;
      SignupList[3].addText.text = "";
      SignupList[3].addBtn.className = "input-item-btn-before-ignore";
      return;
    }

    if (val.length < nickLowerBound) {
      SignupList[3].addBtn.disabled = true;
      SignupList[3].addBtn.className = "input-item-btn-before-ignore";
      SignupList[3].addText.text = "❗ 입력이 너무 짧습니다.";
      SignupList[3].addText.className = "input-text-red";
    } else {
      SignupList[3].addBtn.disabled = false;
      SignupList[3].addBtn.className = "input-item-btn-before";
      SignupList[3].addText.text = "";
      SignupList[3].addText.className = "";
    }
  };

  // 클릭3: axios(닉네임 유효성 검사)
  const onClick3 = () => {
    if (
      dummy.some((item) => {
        return item.id === list[3].value;
      })
    ) {
      // 중복이 있는 경우 -> 지금 이 경우가 보이지 않는다.
      SignupList[3].addText.text = "❗ 이미 존재하는 ID입니다.";
      SignupList[3].addText.className = "input-text-red";
      checkList[3].setCheck(false); // 기존의 값과 변동이 없기에 re-rendering이 일어나지 않음.
      checkList[3].setCheck((current) => {
        // 더미 변수를 업데이트함으로써 이를 해결함.
        return current + 1;
      });
    } else {
      // 중복이 없는 경우
      SignupList[3].addBtn.content = "✔";
      SignupList[3].addBtn.className = "input-item-btn-after";
      SignupList[3].addText.text = "✔ 사용이 가능한 닉네임입니다.";
      SignupList[3].addText.className = "input-text-green";
      checkList[3].setCheck(true);
    }
  };

  SignupList[3].addBtn.custom_onChange = onChange3;
  SignupList[3].addBtn.onClick = onClick3;

  const List = list.map((item, index) => {
    return { ...item, ...SignupList[index] };
  });

  return (
    <>
      {List.map((item) => {
        return <InputComponent key={item.name} {...item} />;
      })}
    </>
  );
};

export default SignupComponent;
export { resetSignupList };
