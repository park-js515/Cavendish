import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const mainBtn = [
  { name: "Recommend", path: "/recommend" },
  { name: "Community", path: "/board" },
];

const MainContents = () => {
  return (
    <div>
      <div className="mainDiscription">
        <p className="mainTitle">CAVENDISH</p>
        <p className="mainComment">Computer Recommendation System</p>
      </div>
      <div>
        <div className="mainButtons">
          {mainBtn.map((btn, index) => {
            return (
              <li className="mainButtons__list" key={index}>
                <Link to={btn.path}>
                  <button className="mainBtn">{btn.name}</button>
                </Link>
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainContents;
