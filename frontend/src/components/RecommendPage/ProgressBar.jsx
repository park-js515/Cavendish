const list = [{}, {}, {}, {}, {}, {}];

const ProgressBar = () => {
  return (
    <div className="progressBar">
      <div className="steps">
        <span className="circle active">1</span>
        <span className="circle">2</span>
        <span className="circle">3</span>
        <span className="circle">4</span>
        <span className="circle">5</span>
        <span className="circle">!</span>
        <div className="progress-bar">
          <span className="indicator"></span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
