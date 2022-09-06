import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/logored.svg";
import "../Css/css.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ERRORR from "../assets/ERRORR.png";

const AuthComponent = ({
  onSubmitHandler,
  onOpenModal,
  onCloseModal,
  open,
  isError,
  message,
  message1,
setMessage1,
  open1,
setOpen1,
onOpenModal1,
onCloseModal1,
onResetHandler,
reset,
setReset
}) => {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  useEffect(() => {
    window.history.pushState("", "", "/");
  }, []);

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
            <p className="par">Sign In</p>
            <p className="par2">Sign in to your account</p>
            <div
              style={{
                paddingBottom: "25px",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                width: "300px",
                display: "flex",
                height: "200px",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: "8px",
              }}
            >
              <div>
                <p className="par3">Email address</p>
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
                  placeholder="  Email"
                  onChange={(event) => setUserName(event.target.value)}
                />
              </div>
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
                  placeholder="  Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="buttonC">
                <button
                  className="button"
                  onClick={() => onSubmitHandler(UserName, Password)}
                >
                  <p className="buttonT">Sign In</p>{" "}
                </button>
              </div>
        <p onClick={setOpen1} style={{fontSize:"13px",color:"green", textAlign:"right", alignSelf:"flex-end", marginBlock:"10px", marginRight:"5px", cursor:"pointer", fontFamily:"Montserrat" }}>forgott?</p>
            </div>
          </div>
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
        <div className="modal" style={{ minWidth: "250px" }}>
          <img
            src={ERRORR}
            style={{
              width: "55px",
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />

          <p className="modalText">{message}</p>

          <button className="modalButton" onClick={onCloseModal}>
            Continue
          </button>
        </div>
      </Modal>
      <Modal open={open1} onClose={onCloseModal1} center classNames={"modal"}>
        <div className="modal" style={{minHeight:"95px", minWidth: "250px", maxWidth:"300px"}}>
         
          <p className="modalText" style={{fontSize:"13", marginTop:"20px"}}>{message1}</p>
          <p className="modalText" style={{fontSize:"10px", marginTop:"20px"}}>it may be in the spam folder.</p>
          {message1!=="Check your email for instructions"&&
          <>
          <input
                  className="loginInput"
                  style={{
                    maxWidth: "270px",
                    height: "25px",
                    borderWidth: "0px",
                    borderRadius: "8px",
                    backgroundColor: "#E5E5E5",
                    paddingX: "5px",
                    alignSelf:"center",
                    marginTop:"20px",
                    marginBottom:"5px"
                  }}
                  placeholder="Email"
                  onChange={(event) => setReset(event.target.value)}
                />
            
          <button className="modalButton" onClick={onResetHandler}>
            Continue
          </button></>}
        </div>
      </Modal>
    </div>
  );
};

export default AuthComponent;
