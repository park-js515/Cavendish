import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainLogo from "./MainLogo";
import MainContents from "./MainContents";

const MainBody = () => {
  return (
    <div className="mainBody">
      <MainContents></MainContents>
      <MainLogo></MainLogo>
    </div>
  );
};

export default MainBody;
