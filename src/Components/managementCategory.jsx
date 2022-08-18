import React from "react";
import "../Css/css.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { NavLink } from "react-router-dom";
import Isologo_background from "../assets/Isologo_background.png";
import { BsChevronLeft } from "react-icons/bs";

const ManagementCategoryComponent = ({
  onOpenModal,
    onCloseModal,
    open,
    control,
    handleSubmit,
    onSubmit,
    register,
    errors,
    schema
}) => {
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Add Category</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="managerInputsContainer">
          <div className="managerInputsubContainer">
            <div className="inputDiv">
              <p className="PAYtitle">Category Name</p>
              <input
                {...register("name")}
                placeholder="Category Name"
                className="AQinput"
              ></input>
              <p className="FORMerror">{errors.name?.message}</p>
            </div>
            <div className="inputDiv" style={{marginRight:"50%"}}>
              <p className="PAYtitle">Category NSD value</p>
              <input
                {...register("NSDvalue")}
                placeholder="Category NSD value"
                className="AQinput"
              ></input>
              <p className="FORMerror">{errors.NSDvalue?.message}</p>
            </div>
          </div>

        </div>
      </form>

      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <button onClick={handleSubmit(onSubmit)} className="PAYbutton">
          <p className="PAYbuttonText">Add Category</p>
        </button>
      </div>
      <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
        <div className="modal">
          <img
            src={Icon}
            style={{
              width: "35px",
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />

          <p className="modalText">Category added successfully</p>

          <button className="modalButton">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "#000" }}
              to={"/Management"}
            >
              Continue
            </NavLink>
          </button>
        </div>
      </Modal>

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
      <BsChevronLeft
        color="grey"
        style={{
          minWidth: "25px",
          minHeight: "25px",
          position: "fixed",
          zIndex: 9,
          left: "80px",
          top: "17px",
          alignSelf: "flex-start",
        }}
        onClick={() => window.history.go(-1)}
      />
    </div>
  );
};
export default ManagementCategoryComponent;
