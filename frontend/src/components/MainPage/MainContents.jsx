import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MainContents = () => {
  return (
    <div>
      <div className="mainDiscription">
        <p className="mainTitle">CAVENDISH</p>
        <p className="mainComment">Computer Recommendation System</p>
      </div>
      <div>
        <div className="mainButtons">
          <li className="mainButtons__list">
            <Link to="/part">
              <button className="mainBtn">Parts</button>
            </Link>
          </li>
          <li className="mainButtons__list">
            <Link to="/recommend">
              <button className="mainBtn">Recommend</button>
            </Link>
          </li>
          <li className="mainButtons__list">
            <Link to="/board">
              <button className="mainBtn">Community</button>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default MainContents;
