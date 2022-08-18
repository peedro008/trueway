import React from "react";
import Isologo_background from "../assets/Isologo_background.png";
import "../Css/css.css";
import { MdAdd } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Management = () => {
  const userRole = useSelector((state) => state.userRole);

  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Management</p>
      </div>

      {userRole !== "Producer" && (
        <div className="managerContainer">
          <NavLink
            to={"./management/Company"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button className="PAYbutton" style={{ marginRight: "20px" }}>
              <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
              <p className="PAYbuttonText"> Add Company</p>
            </button>
          </NavLink>

          <NavLink
            to={"./management/Producer"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button className="PAYbutton" style={{ marginRight: "20px" }}>
              <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
              <p className="PAYbuttonText"> Add Producer</p>
            </button>
          </NavLink>
          <NavLink
            to={"./management/Manager"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button className="PAYbutton" style={{ marginRight: "20px" }}>
              <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />
              <p className="PAYbuttonText"> Add Manager</p>
            </button>
          </NavLink>
        </div>
      )}
      <div className="managerContainer1">
        <NavLink
          to={"./management/Client"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button className="PAYbutton" style={{ marginRight: "20px" }}>
            <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText"> Add Client</p>
          </button>
        </NavLink>
        <NavLink
          to={"./management/Dealer"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button className="PAYbutton" style={{ marginRight: "20px" }}>
            <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText">Add Dealer</p>
          </button>
        </NavLink>
        
        
        <NavLink
          to={"./management/DealerSalePerson"}
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button className="PAYbutton" style={{ marginRight: "20px" }}>
            <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
            <p className="PAYbuttonText">Add Dealer sale person</p>
          </button>
        </NavLink>
      </div>
        {userRole !== "Producer" && (<div className="managerContainer1">
      
          <NavLink
            to={"./management/Location"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button className="PAYbutton" style={{ marginRight: "20px" }}>
              <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
              <p className="PAYbuttonText">Add Location</p>
            </button>
          </NavLink>
     
 
        {userRole !== "Producer" && (
          <NavLink
            to={"./management/Category"}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <button className="PAYbutton" style={{ marginRight: "20px" }}>
              <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />{" "}
              <p className="PAYbuttonText">Add Category</p>
            </button>
          </NavLink>
        )}
      </div>
   )}
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
export default Management;
