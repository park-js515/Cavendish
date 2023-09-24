import { useDispatch, useSelector } from "react-redux";

const PartSelect = () => {
  const selected = useSelector((state) => {
    return state.recommend.selected;
  });

  return <div></div>;
};

export default PartSelect;
