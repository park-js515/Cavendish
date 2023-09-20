import "styles/css/RecommendPage.css";
import { useState } from "react";

// ProgressBar
import ProgressBar from "./ProgressBar";

// Process
import Process1 from "./Process/Process1";
import Process2 from "./Process/Process2";
import Process3 from "./Process/Process3";
import Process4 from "./Process/Process4";
import Process5 from "./Process/Process5";

// tab
import TabGroup from "./Tab/TabGroup";

const ProcessList = [Process1, Process2, Process3, Process4, Process5];

const RecommendPageComponent = () => {
  const [processNo, setProcessNo] = useState(0);
  const NowProcess = ProcessList[processNo];
  const handleSetProcessNo = (move) => {
    setProcessNo((current) => {
      return (current + move) % 5;
    });
  };

  return (
    <div className="recommend">
      <div className="top">
        <ProgressBar />
      </div>
      <div className="bottom">
        <div className="left">
          <NowProcess processHandler={handleSetProcessNo} />
        </div>
        <div className="right">
          <TabGroup processHandler={handleSetProcessNo} />
        </div>
      </div>
    </div>
  );
};

export default RecommendPageComponent;
