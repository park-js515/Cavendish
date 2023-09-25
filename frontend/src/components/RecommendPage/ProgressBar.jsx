import _ from "lodash";
import { UseSelector, useSelector } from "react-redux";

const list_origin = [
  {
    content: "1",
    className: "circle active",
  },
  {
    content: "2",
    className: "circle",
  },
  {
    content: "3",
    className: "circle",
  },
  {
    content: "4",
    className: "circle",
  },
  {
    content: "5",
    className: "circle",
  },
  {
    content: "...",
    className: "circle",
  },
];

let list = [];

const resetList = () => {
  list = _.cloneDeep(list_origin);
};

const setList = (index) => {
  resetList();
  for (let i = 0; i <= index; i++) {
    list[i].className = "circle active";
  }
};

const Circle = ({ content, className }) => {
  return <div className={className}>{content}</div>;
};

const ProgressBar = () => {
  const processNo = useSelector((state) => {
    return state.recommend.processNo + 1;
  });
  setList(processNo);
  const width = `${(processNo / 5) * 100}%`;

  return (
    <div className="progressBar">
      <div className="steps">
        {list.map((item, index) => {
          return <Circle key={index} {...item} />;
        })}
        <div className="progress-bar">
          <span className="indicator" style={{ width: width }}></span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
export { resetList };
