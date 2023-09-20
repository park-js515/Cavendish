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
          <div className="tab-selected">Login</div>
          <div className="tab" onClick={onClick}>
            Sign Up
          </div>
        </div>
      ) : (
        <div className="tab-group">
          <div className="tab" onClick={onClick}>
            Login
          </div>
          <div className="tab-selected">Sign Up</div>
        </div>
      )}
    </>
  );
};

export default ToggleBtn;
