// 가지고 있는 부품이 있는가?
const Process1_1 = ({ setSubProcess }) => {
  return (
    <div className="proc1_1">
      <div>
        <div className="text">가지고 있는 컴퓨터 본체 부품이 있나요?</div>
        <br />
        <br />
        <div className="btn-group">
          <div
            className="btn-item"
            onClick={() => {
              setSubProcess(1);
            }}
          >
            네
          </div>
          <div
            className="btn-item"
            onClick={() => {
              setSubProcess(3);
            }}
          >
            아니오
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process1_1;
