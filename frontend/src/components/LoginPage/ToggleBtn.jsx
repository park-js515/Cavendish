const ToggleBtn = ({ isLogin, setIsLogin }) => {
  const onClick = () => {
    setIsLogin((current) => {
      return !current;
    });
  };

  return (
    <>
      {isLogin ? (
        <div className="tab-group">
          <div className="tab-selected left">Login</div>
          <div className="tab right" onClick={onClick}>
            Sign Up
          </div>
        </div>
      ) : (
        <div className="tab-group">
          <div className="tab left" onClick={onClick}>
            Login
          </div>
          <div className="tab-selected right">Sign Up</div>
        </div>
      )}
    </>
  );
};

export default ToggleBtn;
