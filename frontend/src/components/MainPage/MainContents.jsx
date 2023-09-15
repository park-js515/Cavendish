import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MainContents = () => {
  return (
    <div>
      <div>
        <p className="mainTitle">CAVENDISH</p>
        <p className="mainComment">Computer Recommendation System</p>
      </div>
      <ul>
        <Link to="/part">
          <button className="btn">Parts</button>
        </Link>
        <Link to="/recommend">
          <button className="btn">Recommend</button>
        </Link>
        <Link to="/board">
          <button className="btn btn__login">Community</button>
        </Link>
      </ul>
    </div>
  );
};

export default MainContents;
