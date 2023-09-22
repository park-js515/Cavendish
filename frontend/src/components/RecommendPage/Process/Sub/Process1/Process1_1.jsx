// 가지고 있는 부품이 있는가?
const Process1_1 = ({ setSubProcess }) => {
  return (
    <div className="sub">
      <p>가지고 있는 부품이 있나요?</p>
      <button
        onClick={() => {
          setSubProcess(1);
        }}
      >
        Yes
      </button>
      <button
        onClick={() => {
          setSubProcess(2);
        }}
      >
        No
      </button>
    </div>
  );
};

export default Process1_1;
