import React, { useEffect, useState } from "react";
import "../Css/css.css";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import Isologo_background from "../assets/Isologo_background.png";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsChevronLeft } from "react-icons/bs";



const ManagementCompanyComponent = ({
    onOpenModal,
    onCloseModal,
    open,
    categories,
    control,
    handleSubmit,
    errors,
    onSubmit,
    register,
    options,
    schema
}) => {
 
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Add Company</p>
      </div>

      <div className="managerInputsContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="managerInputsubContainer">
            <div className="inputDiv">
              <p className="PAYtitle">Company Name</p>
              <input
                {...register("name")}
                placeholder="Company Name"
                className="AQinput"
              ></input>
              <p className="FORMerror">{errors.name?.message}</p>
            </div>

            <div className="inputDiv" style={{ marginRight: "66%" }}>
              <p className="PAYtitle">Category</p>
              {/* <Select  control={control} options={categories.map(e=>({value:e.id,label:e.name}))} name={"CategoryId"} className="PAYselect"  placeholder="Select Company"/>
               */}

              <Controller
                control={control}
                name="CategoryId"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={options.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    control={control}
                    options={categories.map((e) => ({
                      value: e.id,
                      label: e.name,
                    }))}
                    name={"CategoryId"}
                    className="PAYselect"
                    placeholder="Select Company"
                  />
                )}
              />

              <p className="FORMerror">{errors.CategoryId?.message}</p>
            </div>
          </div>
        </form>
      </div>

      {/* <input type="submit"  className="PAYbutton"/> */}
      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <button onClick={handleSubmit(onSubmit)} className="PAYbutton">
          <p className="PAYbuttonText">Add Company</p>
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

          <p className="modalText">Company added successfully</p>

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
          zIndex: 0,
          right: 0,
          bottom: -8,
          width: "528px",
          opacity: "0.5",
        }}
      />
      <BsChevronLeft
        color="grey"
        style={{
          minWidth: "30px",
          minHeight: "30px",
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
export default ManagementCompanyComponent;
