// 가지고 있는 부품이 있는가?
const Process1_1 = ({ setSubProcess }) => {
  return (
    <div className="sub proc1">
      <div>
        <div className="center">가지고 있는 부품이 있나요?</div>
        <div className="center">
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
      </div>
    </div>
  );
};

export default Process1_1;
