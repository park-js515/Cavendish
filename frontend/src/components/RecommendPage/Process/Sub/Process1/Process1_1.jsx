// 가지고 있는 부품이 있는가?
const Process1_1 = ({ setSubProcess }) => {
  return (
    <div className="proc1_1">
      <div>
        <div className="text">포함시키고 싶은 컴퓨터 부품이 있나요?</div>
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
