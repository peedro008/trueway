import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/logored.svg";
import "../Css/css.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ERRORR from "../assets/ERRORR.png";

const ResetPassComponent = ({
  Password,
  setPassword,
  RPassword,
  setRPassword,
  onResetHandler,
  open,
  onOpenModal,
  onCloseModal,
  message,
  reload
}) => {



  return (
    <div className="main">
      <div className="containerLogo">
        <div style={{ display: "flex", alignSelf: "center", marginTop: "45%" }}>
          <img
            style={{
              width: "250px",
              height: "auto",
              objectFit: "cover",
              display: "flex",
            }}
            src={logo}
          />
        </div>
      </div>
      <div className="loginContainer">
        <div className="box">
          <div>
            <p className="par">Recovery Password</p>
            <p className="par2">Insert your new Password</p>
            <div
              style={{
                paddingBottom: "25px",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                width: "300px",
                display: "flex",
                height: "180px",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "8px",
              }}
            >
              <div>
                <p className="par3">Password</p>
                <input
                  className="loginInput"
                  style={{
                    width: "270px",
                    height: "25px",
                    borderWidth: "0px",
                    borderRadius: "8px",
                    backgroundColor: "#E5E5E5",
                    paddingX: "5px",
                  }}
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div>
                <p className="par3">Repeat password</p>
                <input
                  className="loginInput"
                  style={{
                    width: "270px",
                    height: "25px",
                    borderWidth: "0px",
                    borderRadius: "8px",
                    backgroundColor: "#E5E5E5",
                    paddingX: "5px",
                  }}
                  type="password"
                  placeholder="Repeat password"
                   onChange={(event) => setRPassword(event.target.value)}
                />
              </div>
              <div className="buttonC">
                <button
                  className="button"
                  onClick={() => onResetHandler()}
                  disabled={(Password==RPassword)&&(Password.length)?false:true}
                >
                  <p className="buttonT">Submit</p>{" "}
                </button>
              </div>
          
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
        <div className="modal" style={{ minWidth: "250px" }}>
         

          <p className="modalText">{message}</p>

          <button className="modalButton" onClick={reload}>
            Continue
          </button>
        </div>
      </Modal>
     
    </div>
  );
};

export default ResetPassComponent;
