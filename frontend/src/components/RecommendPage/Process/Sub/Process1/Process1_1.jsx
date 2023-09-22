// 가지고 있는 부품이 있는가?
const Process1_1 = ({ setSubProcess }) => {
  return (
    <div className="sub">
      <div className="jc">
        <div className="text">가지고 있는 본체 부품이 있나요?</div>
        <br />
        <div className="btn-group">
          <div
            className="btn"
            onClick={() => {
              setSubProcess(1);
            }}
          >
            네
          </div>
          <div
            className="btn"
            onClick={() => {
              setSubProcess(2);
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
