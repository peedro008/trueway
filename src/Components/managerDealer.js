import React, { useEffect, useState } from "react";
import "./CSS/css.css";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import Isologo_background from "../assets/Isologo_background.png";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { NavLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const schema = yup
  .object({
    ClientId: yup.number().required(),
    DealerSalePersonId: yup.number().required(),
    amount: yup.string().required(),
    paid: yup.bool().required().default(false),
    })
  .required();

const ManagerDealer = () => {
  const [dealerSalePerson, setDealerSalePerson] = useState([]);
  const [client, setClient] = useState([]);
  const [neww, setNeww] = useState(false);

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [inputs, setinputs] = useState({});
  const reload = () => {
    window.location.reload();
  };
  const onSubmit = (data) => {
    data && 

    fetch(`http://localhost:8080/addDealer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();

          if (res.status !== 200) {
            console.log("error");
          } else {
            console.log(jsonRes);
          }
        } catch (err) {
          console.log(err);
        }
        onOpenModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getDealerSalePerson`)
      .then(function (response) {
        setDealerSalePerson(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/clients`)
      .then(function (response) {
        setClient(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const optionsC = client.map((e) => ({ value: e.id, label: e.name }));
  const optionsD = dealerSalePerson.map((e) => ({ value: e.id, label: e.name }));

  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Add Dealer</p>
      </div>

      <div className="managerInputsContainer">
        <div className="managerInputsubContainer" style={{ width: "50vw" }}>
        <div className="inputDiv">
            <p className="PAYtitle">Client</p>
            <Controller
              control={control}
              name="ClientId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  value={optionsC.find((c) => c.value === value)}
                  onChange={(val) =>{ onChange(val.value)}}
                  control={control}
                  options={client.map((e) => ({
                    value: e.id,
                    label: e.name,
                  }))}
                  name={"ClientId"}
                  className="PAYselect"
                  placeholder="Select Client"
                />
              )}
            />
            <p className="FORMerror">{errors.ClientId?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Dealer Sale Person</p>
            <Controller
              control={control}
              name="DealerSalePersonId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  value={optionsD.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                  control={control}
                  options={dealerSalePerson.map((e) => ({
                    value: e.id,
                    label: e.name,
                  }))}
                  name={"DealerSalePersonId"}
                  className="PAYselect"
                  placeholder="Dealer Sale Person"
                />
              )}
            />
            <p className="FORMerror">{errors.DealerSalePersonId?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Amount</p>
            <input
              {...register("amount")}
              placeholder="Insert Amount"
              onChange={(e) => {
                setinputs({ ...inputs, phone: e.target.value });
              }}
              className="AQinput"
            ></input>
            <p className="FORMerror">
              {errors.amount?.message.substring(0, 25)}
            </p>
          </div>
          <div
                  className="AQinputContainer"
                 
                >
                  <p className="AQinputName">Paid</p>
                  <div className="AQyesNoContainer">
                    <div>
                      <input
                        className="AQcheckInput"
                        type="checkbox"
                        checked={neww}
                        name="paid"
                        {...register("paid")}
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
          <p className="PAYbuttonText">Add Dealer</p>
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

          <p className="modalText">Dealer added successfully</p>

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
export default ManagerDealer;
