import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SideBar = ({ partCategory, partSelect, setPartSelect }) => {
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
              <li
                key={index}
                onClick={() => {
                  selectPart({ index, partSelect, setPartSelect });
                }}
              >
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

const selectPart = ({ index, partSelect, setPartSelect }) => {
  partSelect.map((item, idx) => {
    let copy = [...partSelect];
    if (idx == index) {
      copy[idx] = true;
    } else {
      copy[idx] = false;
    }
    setPartSelect(copy);
    console.log(copy);
  });
};

export default SideBar;
