import React from "react";
import { NavLink } from "react-router-dom";
import "../Css/css.css";
import logo from "../assets/logo.png";
import { FiGrid } from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { BiStats } from "react-icons/bi";
import { FaCoins, FaRegMoneyBillAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineFile } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/actions";
import vertafore from "../assets/vertafore.png";
import agencyZoom from "../assets/agencyZoom.jpg";
import qqcatalyst from "../assets/qqcatalyst.png";
import buddyPunch from "../assets/buddyPunch.png";

function ProducerNav({ onSearch }) {
  const dispatch = useDispatch();

  const Name = useSelector((state) => state.User);

  const Role = useSelector((state) => state.userRole);

  const logOut = () => {
    localStorage.clear();
    window.history.pushState("", "", "/");
    dispatch(logout());
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="topbar">
        <div style={{ paddingRight: "50px", display: "flex" }}>
          <div
            className="circleLink"
            style={{ marginBottom: "10px", marginRight: "23px" }}
          >
            <a href="https://app.buddypunch.com/" target="_blank">
              <img className="imageLink3" src={buddyPunch} alt={"logo"} />
            </a>
          </div>
          <div className="circleLink">
            <a
              href="https://login.apps.vertafore.com/idp/prp.wsf?wa=wsignin1.0&wtrealm=https%3a%2f%2frating.vertafore.com%2fUserInterface%2f&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fUserInterface%252fmain%252fvim.aspx&wct=2022-11-29T14%3a24%3a52Z"
              target="_blank"
            >
              <img className="imageLink" src={vertafore} alt={"logo"} />
            </a>
          </div>
          <div className="circleLink" style={{ marginBottom: "10px" }}>
            <a href="https://app.agencyzoom.com/login" target="_blank">
              <img
                className="imageLink"
                src={agencyZoom}
                alt={"logo"}
                style={{ height: "48px", width: "48px" }}
              />
            </a>
          </div>
          <div className="circleLink" style={{ marginLeft: "6px" }}>
            <a
              href="https://login.qqcatalyst.com/Login.aspx?ReturnUrl=%2fOAuthAuthorize.aspx%3fClientApp%3dQQCatalyst%2bWeb%26ClientIdentifier%3dDC152CD1-F653-4DF0-9E39-2337A7F9C887%26Callback%3dhttps%3a%2f%2fapp.qqcatalyst.com%2fAccount%2fLoginNew%26State%3dZige4fJSkNB9CzHBC9WjvQ%26Scope%3dTimestamp112922142356%26ResponseType%3dcode%26OverrideBrowserCheck%3d&ClientApp=QQCatalyst+Web&ClientIdentifier=DC152CD1-F653-4DF0-9E39-2337A7F9C887&Callback=https://app.qqcatalyst.com/Account/LoginNew&State=Zige4fJSkNB9CzHBC9WjvQ&Scope=Timestamp112922142356&ResponseType=code&OverrideBrowserCheck="
              target="_blank"
            >
              <img className="imageLink" src={qqcatalyst} alt={"logo"} />
            </a>
          </div>
        </div>
        <div style={{ paddingRight: "40px", display: "flex" }}>
          <div className="circle">
            <p className="initial">{Name.Name && Name.Name.substring(0, 1)}</p>
          </div>
          <div className="ANusercontainer">
            <p className="NAname">{Name.Name}</p>
            <p className="NArole">{Role}</p>
          </div>
          <button
            onClick={() => logOut()}
            style={{
              backgroundColor: "transparent",
              borderWidth: "0px",
              cursor: "pointer",
            }}
          >
            <FiLogOut
              size="20px"
              color="grey"
              style={{ alignSelf: "center" }}
            />
          </button>
        </div>
      </div>

      <div className="sidebar">
        <img className="image" src={logo} alt={"logo"} />
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/"
            activeClassName="NAavtive"
            exact
          >
            <FiGrid
              className="NAicon"
              color="#868ba5"
              activeClassName="NAactive"
            />
          </NavLink>
        </div>

        <span />

        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/addquote"
            activeClassName="NAavtive"
          >
            <AiOutlineFile className="NAicon" size="20px" color="#868ba5" />
          </NavLink>
        </div>
        <span />
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/Management"
            activeClassName="NAavtive"
          >
            <MdAdd className="NAicon" size="25px" color="#868ba5" />
          </NavLink>
        </div>
        <span />
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/payments"
            activeClassName="NAavtive"
          >
            <FaRegMoneyBillAlt className="NAicon" color="#868ba5" />
          </NavLink>
        </div>
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/policyNumberReport"
            activeClassName="NAavtive"
          >
            <FaCoins className="NAicon" color="#868ba5" />
          </NavLink>
        </div>
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/report"
            activeClassName="NAavtive"
          >
            <VscGraph className="NAicon" size="20px" color="#868ba5" />
          </NavLink>
        </div>
        <span />
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/profile"
            activeClassName="NAavtive"
          >
            <FiUser className="NAicon" size="20px" color="#868ba5" />
          </NavLink>
        </div>
        <span />
        <div className="NAcontainer">
          <NavLink
            className="NAiconCover"
            to="/stadistic"
            activeClassName="NAavtive"
          >
            <BiStats className="NAicon" size="20px" color="#868ba5" />
          </NavLink>
        </div>
        <div
          className="NAcontainer"
          style={{ cursor: "help" }}
          onClick={() => {
            window.open("https://wa.me/5493515330625");
            return null;
          }}
        >
          <BsInfoCircle className="NAicon" size="20px" color="#868ba5" />
        </div>
      </div>
    </div>
  );
}

export default ProducerNav;
