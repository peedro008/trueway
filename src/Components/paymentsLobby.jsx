import React from "react";
import "../Css/css.css";
import { MdAdd } from "react-icons/md";
import { CgImport } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import Isologo_background from "../assets/Isologo_background.png";
import { useSelector } from "react-redux";
const PaymentsLobby = () => {
  const userRole = useSelector((state) => state.userRole);
  
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Payments</p>
      </div>

      <div
        className="PAYbuttonCont"
        style={{ width: userRole == "Admin" ? "340px" : "580px" }}
      >
        <NavLink
          style={{ textDecoration: "none", color: "#000" }}
          to="/payments/pay"
        >
          <button className="PAYbuttonAdd">
            <MdAdd size="1.25em" className="PAYbuttonIcon" color="#FFFFFF" />
            <p className="PAYbuttonText">Add payment</p>
          </button>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none", color: "#000" }}
          to="/payments/deposit"
        >
          <button className="PAYbuttonAdd" style={{marginLeft: '20px'}}>
            <MdAdd size="1.25em" className="PAYbuttonIcon" color="#FFFFFF" />
            <p className="PAYbuttonText">Deposit cash</p>
          </button>
        </NavLink>
        {userRole !== "Admin" && (
          <NavLink
            to="/payments/dailyReport"
            style={{ textDecoration: "none", color: "#000",marginLeft: '20px' }}
          >
            <button className="PAYbutton">
              <CgImport
                size="1.2em"
                className="PAYbuttonIcon"
                color="#FFFFFF"
              />
              <p className="PAYbuttonText" style={{minWidth: '180px', }}>Generate daily report</p>
            </button>
          </NavLink>
        )}
      </div>

      <img
        src={Isologo_background}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "428px",
          opacity: "0.5",
        }}
      />
    </div>
  );
};

export default PaymentsLobby;
