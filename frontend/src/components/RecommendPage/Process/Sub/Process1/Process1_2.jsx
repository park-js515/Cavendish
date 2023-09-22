import { setTab } from "components/RecommendPage/Tab/TabGroup";
// 9가지 부품 리스트
const list = [
  {
    name: "CPU",
  },
  { name: "메인보드" },
  {
    name: "메모리",
  },
  {
    name: "그래픽카드",
  },
  {
    name: "SSD",
  },
  {
    name: "HDD",
  },
  {
    name: "케이스",
  },
  {
    name: "파워",
  },
  {
    name: "쿨러",
  },
];

const Process1_2 = ({ setSubProcess }) => {
  return (
    <div className="sub proc2">
      <p>Process1_2</p>
      <button
        onClick={() => {
          setSubProcess(2);
        }}
      >
        버튼1
      </button>
    </div>
  );
};

export default Process1_2;
