import _ from "lodash";
import { useSelector } from "react-redux";
import TabItem from "./TabItem";

// 리스트로 미리 추후 쌓을 것을 만들어 놓기
// 제거 버튼
// 정보를 제공해야 함
// 현재 선택 중일 때는 이 과정을 하고 있다고 강조
//
const tabList_origin = [
  { title: "1. 보유 부품 확인", className: "tab-item" },
  { title: "2. 용도 선택(최대 2개)", className: "tab-item" },
  { title: "3. 세부 용도 선택(각 최대 3개)", className: "tab-item" },
  { title: "4. 예산 선택", className: "tab-item" },
  { title: "5. 우선 순위 선택", className: "tab-item" },
];
let tabList = [];

const resetTabList = () => {
  tabList = _.cloneDeep(tabList_origin);
};

const TabGroup = () => {
  const processNo = useSelector((state) => {
    return state.recommend.processNo;
  });

  resetTabList();

  return (
    <div className="tab-group">
      {tabList.map((item, index) => {
        return (
          <TabItem
            key={index}
            {...item}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default TabGroup;