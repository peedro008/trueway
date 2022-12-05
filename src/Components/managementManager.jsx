import React, { useEffect, useState } from "react";
import "../Css/css.css";

import Select from "react-select";
import "react-responsive-modal/styles.css";

import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { NavLink } from "react-router-dom";
import {  Controller } from "react-hook-form";

import { BsChevronLeft } from "react-icons/bs";


const ManagementManagerComponenet = ({
  onOpenModal,
  onCloseModal,
  open,
  options,
  locations,
  control,
  inputs,
  setinputs,
  handleSubmit,
  onSubmit,
  register,
  errors,
  reload,
  schema,
}) => {
  
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Add Manager</p>
      </div>

      <div className="managerInputsContainer">
        <div className="managerInputsubContainer" style={{ width: "50vw" }}>
          <div className="inputDiv">
            <p className="PAYtitle">Name</p>
            <input
              {...register("name")}
              placeholder="Name"
              onChange={(e) => {
                setinputs({ ...inputs, name: e.target.value });
              }}
              className="AQinput"
            ></input>
            <p className="FORMerror">{errors.name?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Email</p>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Email"
              className="AQinput"
            ></input>
            <p className="FORMerror">{errors.email?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Phone</p>
            <input
              {...register("phone")}
              placeholder="Phone"
              onChange={(e) => {
                setinputs({ ...inputs, phone: e.target.value });
              }}
              className="AQinput"
            ></input>
            <p className="FORMerror">
              {errors.phone?.message.substring(0, 25)}
            </p>
          </div>
        
        </div>
        <div className="managerInputsubContainer" style={{ width: "32.5vw" }}>
          <div className="inputDiv">
            <p className="PAYtitle">Password</p>
            <input
              type="password"
              {...register("Password")}
              placeholder="Password"
              className="AQinput"
            ></input>
            <p className="FORMerror">{errors.Password?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Location</p>
            <Controller
              control={control}
              name="LocationId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                  control={control}
                  options={locations.map((e) => ({
                    value: e.id,
                    label: e.name,
                  }))}
                  name={"LocationId"}
                  className="PAYselect"
                  placeholder="Select Location"
                />
              )}
            />
            <p className="FORMerror">{errors.LocationId?.message}</p>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <button className="PAYbutton" onClick={handleSubmit(onSubmit)}>
          <p className="PAYbuttonText">Add Manager</p>
        </button>
      </div>
      <Modal open={open} onClose={reload} center classNames={"modal"}>
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

          <p className="modalText">Manager added successfully</p>

          <button onClick={reload} className="modalButton">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "#000" }}
              to={"/Manager"}
            >
              Continue
            </NavLink>
          </button>
        </div>
      </Modal>
      
      <BsChevronLeft
          cursor='pointer'
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
export default ManagementManagerComponenet;
