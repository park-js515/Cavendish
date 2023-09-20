import TabItem from "./TabItem";
import _ from "lodash";

// 리스트로 미리 추후 쌓을 것을 만들어 놓기
const tabList_origin = [{}, {}, {}, {}, {}];
let tabList = [];
const resetTabList = () => {
  tabList = _.cloneDeep(tabList_origin);
};

const TabGroup = () => {
  resetTabList();
  return (
    <div className="tab-group">
      {tabList.map((item, index) => {
        return <TabItem key={index} resetTabList={resetTabList} />;
      })}
    </div>
  );
};

export default TabGroup;
