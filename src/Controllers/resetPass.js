import React, { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import "../Css/css.css";
import {
  addLocation,
  userRole,
  userName,
  user,
  userId,
} from "../Redux/actions";
import AuthComponent from "../Components/auth";
import "react-responsive-modal/styles.css";

import ResetPassComponent from "../Components/resetPass";


const ResetPass = () => {
  var URLactual = window.location.search.substring();
  let pes = URLactual.split("=")[1]
  console.log(pes)
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [Password, setPassword] = useState("");
  const [RPassword, setRPassword] = useState("");

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [reset, setReset]= useState("")

  const producers = useSelector((state) => state.Producers);
  const reload = () => {
    window.history.pushState("", "", "/");
    window.location.reload();
  };
  const onResetHandler = () => {
    const payload = {
      UserName:pes,
      Password:Password,
   
    };
    fetch(`http://localhost:8080/resetPass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(async (res) => {
      onOpenModal();
     setMessage("Done!")
    })
    .catch((err) => {
      console.log(err);
      setMessage("There was an error, try again later.")
    });
  }
  return (
    <ResetPassComponent
    Password={Password}
    setPassword={setPassword}
    RPassword={RPassword}
    setRPassword={setRPassword}
    onResetHandler={onResetHandler}
    open={open}
    onOpenModal={onOpenModal}
    onCloseModal={onCloseModal}
    message={message}
    reload={reload}
    />
  );
};
export default ResetPass;
