import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ partCategory, partName }) => {
  return (
    // <div className="s-layout__sidebar">
    //   <a className="s-sidebar__trigger" href="#0">
    //     <i className="fa fa-bars"></i>
    //   </a>
    <div>
      <nav className="s-sidebar__nav">
        <ul>
          {partCategory.map((item, index) => {
            return (
              <li key={index}>
                <Link className="s-sidebar__nav-link" to={`/part/${item}`}>
                  <i className="fa fa-home"></i>
                  <em>{item}</em>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
    // </div>
  );
};

export default SideBar;
