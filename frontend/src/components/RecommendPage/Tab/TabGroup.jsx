import _ from "lodash";
import { useSelector } from "react-redux";
import TabItem from "./TabItem";

// 리스트로 미리 추후 쌓을 것을 만들어 놓기
// 제거 버튼
// 정보를 제공해야 함
// 현재 선택 중일 때는 이 과정을 하고 있다고 강조
// 
const tabList_origin = [
  { title: "보유 부품 확인", content: "", className: "tab-item-before" },
  { title: "용도 선택", content: "", className: "tab-item-before" },
  { title: "세부 용도 선택", content: "", className: "tab-item-before" },
  { title: "예산 선택", content: "", className: "tab-item-before" },
  { title: "우선 순위 선택", content: "", className: "tab-item-before" },
];
let tabList = [];

const resetTabList = () => {
  tabList = _.cloneDeep(tabList_origin);
};
const resetTab = (index) => {
  tabList[index] = { ...tabList_origin[index] };
};
const setTab = (index, props) => {
  tabList[index] = { ...tabList[index], ...props };
};

const setClassName = (index) => {
  for (let i = 0; i <= index; i++) {
    tabList[i].className = "tab-item";
  }
};

const TabGroup = () => {
  const processNo = useSelector((state) => {
    return state.recommend.processNo;
  });

  resetTabList();
  setClassName(processNo);

  return (
    <div className="tab-group">
      {tabList.map((item, index) => {
        return (
          <TabItem
            key={index}
            resetTab={() => {
              resetTab(index);
            }}
            {...item}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default TabGroup;
export { setTab };
