import { useState } from "react";

const TabItem = ({ resetTab, processHandler }) => {
  const [isBefore, setIsBefore] = useState(true);

  return (
    <div
      className={isBefore ? "tab-item-before" : "tab-item"}
      onClick={() => {
        setIsBefore((current) => {
          return !current;
        });
      }}
    >
      TabItem
    </div>
  );
};

export default TabItem;
