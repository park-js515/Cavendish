import loadingImg from "assets/loading.svg";
import "styles/css/common.css";

const Loading = () => {
  return (
    <div className="common-loading">
      <img src={loadingImg} alt="loading" />
    </div>
  );
};

export default Loading;
