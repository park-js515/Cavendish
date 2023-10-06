import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLogo from "./MainLogo";
import MainContents from "./MainContents";

const MainBody = () => {
  return (
    <div className="mainBody">
      <div className="mainContents">
        <MainContents></MainContents>
        <MainLogo></MainLogo>
      </div>
    </div>
  );
};

export default MainBody;
