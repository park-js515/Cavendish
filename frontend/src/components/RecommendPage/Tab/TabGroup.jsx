import TabItem from "./TabItem";
import _ from "lodash";

// 리스트로 미리 추후 쌓을 것을 만들어 놓기
const tabList_origin = [{}, {}, {}, {}, {}];
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

const TabGroup = (processHandler) => {
  resetTabList();
  return (
    <div className="tab-group">
      {tabList.map((item, index) => {
        return (
          <TabItem
            key={index}
            resetTab={() => {
              resetTab(index);
            }}
            {...processHandler}
          />
        );
      })}
    </div>
  );
};

export default TabGroup;
export { setTab };
