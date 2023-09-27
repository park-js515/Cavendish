import { useSelector } from "react-redux";

const Item = ({ imgUrl, value }) => {
  const onClick = () => {};

  return (
    <div className="item" onClick={onClick}>
      <div
        className="item-top"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div className="item-bot">{value}</div>
    </div>
  );
};

// 대분류에 해당하는 것
// 대분류에 대응되는 컴포넌트
const Process3_1 = ({setSubProcess}) => {
  const usage = useSelector((state) => {
    return state.recommend.processList[1];
  });

  return <></>;
};

export default Process3_1;
