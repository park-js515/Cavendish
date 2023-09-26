import "styles/css/RecommendPage.css";
import { useState } from "react";
import { useSelector } from "react-redux";

// ProgressBar
import ProgressBar from "./ProgressBar";

// Process
import Process1 from "./Process/Process1";
import Process2 from "./Process/Process2";
import Process3 from "./Process/Process3";
import Process4 from "./Process/Process4";
import Process5 from "./Process/Process5";
import ProcessEnd from "./Process/ProcessEnd";

// tab
import TabGroup from "./Tab/TabGroup";

const ProcessList = [
  Process1,
  Process2,
  Process3,
  Process4,
  Process5,
  ProcessEnd,
];

const RecommendPageComponent = () => {
  const processNo = useSelector((state) => {
    return state.recommend.processNo + 1;
  });
  const NowProcess = ProcessList[processNo];

  return (
    <div className="recommend">
      <div className="top">
        <ProgressBar />
      </div>
      <div className="bottom">
        <div className="left">
          <div className="wrapper">
            <NowProcess className="process"/>
          </div>
        </div>
        <div className="right">
          <TabGroup />
        </div>
      </div>
    </div>
  );
};

export default RecommendPageComponent;
