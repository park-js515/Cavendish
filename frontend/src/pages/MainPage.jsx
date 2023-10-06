import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../components/MainPage/NavBar";
import MainBody from "../components/MainPage/MainBody";
import "../styles/css/MainPage.css";

const MainPage = () => {
  return (
    <div className="mainPage">
      <NavBar></NavBar>
      <MainBody></MainBody>
    </div>
  );
};

export default MainPage;
