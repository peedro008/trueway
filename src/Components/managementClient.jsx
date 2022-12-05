import React, { useEffect, useState } from "react";
import "../Css/css.css";

import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import Isologo_background from "../assets/Isologo_background.png";
import { NavLink } from "react-router-dom";
import { Controller } from "react-hook-form";
import { BsChevronLeft } from "react-icons/bs";
import { GrCircleQuestion } from "react-icons/gr";

const ManagementClientComponent = ({
  onOpenModal,
  onCloseModal,
  open,
  options,
  Companies,
  control,
  handleSubmit,
  onSubmit,
  register,
  errors,
  schema,
  neww,
  setNeww,
  address,
  setAddress,
}) => {
  const [show, setShow] = useState(true);

  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Add Client</p>
      </div>

      <div className="managerInputsContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="managerInputsubContainer">
            <div className="inputDiv">
              <p className="PAYtitle">Client Name</p>
              <input
                {...register("name")}
                placeholder="Client Name"
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
              <p className="FORMerror">{errors.new?.message}</p>
            </div>
            <div className="inputDiv">
              <p className="PAYtitle">Phone</p>
              <input
                {...register("tel")}
                placeholder="Phone"
                className="AQinput"
              ></input>
              <p className="FORMerror">
                {errors.phone?.message.substring(0, 25)}
              </p>
            </div>

            <div className="AQinputContainer">
              <p className="AQinputName">New client</p>
              <div className="AQyesNoContainer">
                <div>
                  <input
                    className="AQcheckInput"
                    type="checkbox"
                    checked={neww}
                    name="dealer"
                    {...register("new")}
                    onChange={(event) => setNeww(!neww)}
                  />
                  {neww ? (
                    <p className="AQyesNoText">Yes</p>
                  ) : (
                    <p className="AQyesNoText">No</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="managerInputsubContainer">
            <div className="inputDiv">
              <p className="PAYtitle">Company</p>
              <Controller
                control={control}
                name="CompanyId"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={options.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    control={control}
                    options={Companies.map((e) => ({
                      value: e.id,
                      label: e.name,
                    }))}
                    name={"CompanyId"}
                    className="PAYselect"
                    placeholder="Select Company"
                  />
                )}
              />
              <p className="FORMerror">{errors.CompanyId?.message}</p>
            </div>
            <div className="inputDiv">
              <p className="PAYtitle">Date of Birth</p>
              <input
                type={"date"}
                {...register("dateOfBirth")}
                placeholder="Date of Birth"
                className="AQinput"
              ></input>
              <p className="FORMerror">{errors.dateOfBirth?.message}</p>
            </div>
            <div className="inputDiv" style={{ marginRight: "52%" }}>
            <div style={{flexDirection:"row", display:"flex"}}> <p className="PAYtitle">Address</p><GrCircleQuestion onClick={()=>setShow(!show)}/></div>
              {!show ? (<></>
                // <div class="autocomplete-container" id="autocomplete-container">
                //   <GeoapifyContext apiKey="fae2fbe3125e4b1d870dd3ab7c96f6b3">
                //     <GeoapifyGeocoderAutocomplete
                //       placeSelect={(value) => {
                //         setAddress(value.properties.formatted);
                //       }}
                //       suggestionsChange={(value) => {
                //         console.log(value);
                //       }}
                //     />
                //   </GeoapifyContext>
                // </div>
              ) : (
                <input
                    onChange={(e)=>{setAddress(e.target.value)}}
                  placeholder="Address"
                  className="AQinput"
                ></input>
              )}
            </div>
          </div>

          <div className="managerInputsubContainer">
            <div className="MOBinputDiv">
              <p className="MOBinputText">Notes</p>
              <textarea
                {...register("notes")}
                className="MOBtexta"
                style={{ width: "400px" }}
              />
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
          <p className="PAYbuttonText">Add Client</p>
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

          <p className="modalText">Client added successfully</p>

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
          width: "498px",
          opacity: "0.5",
        }}
      />
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
export default ManagementClientComponent;
