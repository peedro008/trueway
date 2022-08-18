import React from "react";
import { AiOutlineFile } from "react-icons/ai";
import { CgImport } from "react-icons/cg";
import Isologo_background from "../assets/Isologo_background.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBank2 } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";

const ReportsLobby = () => {
  const state = useSelector((state) => state.userRole);
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Reports</p>
      </div>
      <div className="managerContainer">
        <NavLink
          to={"/report/filter"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button
            className="PAYbutton"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <AiOutlineFile
              color="white"
              size={"20px"}
              className="PAYbuttonIcon"
            />{" "}
            <p className="PAYbuttonText"> Quotes</p>
          </button>
        </NavLink>
        <NavLink
          to={"/report/paymentReport"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button
            className="PAYbutton"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <CgImport color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText"> Payments</p>
          </button>
        </NavLink>
        <NavLink
          to={"/report/clients"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button
            className="PAYbutton"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <FiUser color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText"> Clients</p>
          </button>
        </NavLink>
        <NavLink
          to={"/report/DealerReport"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button
            className="PAYbutton"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <FaRegMoneyBillAlt
              color="white"
              size={"20px"}
              className="PAYbuttonIcon"
            />{" "}
            <p className="PAYbuttonText">Dealers</p>
          </button>
        </NavLink>
      </div>
      <div className="managerContainer">
        <NavLink
          to={"/report/dailyReport"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button
            className="PAYbutton"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <CgImport color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText"> Daily Report</p>
          </button>
        </NavLink>

        <NavLink
          to={"/report/depositReport"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button
            className="PAYbutton"
            style={{ width: "150px", marginRight: "20px" }}
          >
            <BsBank2 color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText">Deposits</p>
          </button>
        </NavLink>

        {state == "Manager" || state == "Admin" ? (
          <NavLink
            to={"/report/deleted"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button
              className="PAYbutton"
              style={{ width: "150px", marginRight: "20px" }}
            >
              <AiOutlineDelete
                color="white"
                size={"20px"}
                className="PAYbuttonIcon"
              />{" "}
              <p className="PAYbuttonText">Deleted</p>
            </button>
          </NavLink>
        ) : (
          <></>
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
export default ReportsLobby;
