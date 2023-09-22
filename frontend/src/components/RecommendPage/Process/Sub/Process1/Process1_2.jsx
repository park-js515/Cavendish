import { setTab } from "components/RecommendPage/Tab/TabGroup";
// 9가지 부품 리스트
const list = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

const Process1_2 = ({setSubProcess}) => {
  return <div className="sub proc2">
    <p>Process1_2</p>
    <button onClick={() => {setSubProcess(2)}}>버튼1</button>
  </div>;
};

export default Process1_2;
