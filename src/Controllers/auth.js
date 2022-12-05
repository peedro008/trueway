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
  sessionDate,
} from "../Redux/actions";
import AuthComponent from "../Components/auth";
import "react-responsive-modal/styles.css";


const Auth = () => {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [message1, setMessage1] = useState("Insert your email and you will receive a recovery link");

  const [open1, setOpen1] = useState(false);
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);
  const [reset, setReset]= useState("")

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const date = new Date();
 const DATE =
    date.getFullYear() + ( (date.getMonth() + 1)>9?"-":"-0" )+ (date.getMonth() + 1)+"-" + date.getDate()
  useEffect(() => {
    window.history.pushState("", "", "/");
  }, []);
  const producers = useSelector((state) => state.Producers);
  const onSubmitHandler = (UserName, Password) => {
    const payload = {
      UserName,
      Password,
    };
    fetch(`https://truewayagentbackend.com//login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();

          if (res.status !== 200) {
            setIsError(true);
            setMessage(jsonRes.message);
            onOpenModal();
          } else {
            setIsError(false);
            setMessage(jsonRes.message);
            console.log(jsonRes)
            dispatch(user(jsonRes));
            dispatch(userRole(jsonRes.UserRole));
            dispatch(sessionDate(DATE))
            dispatch(userId(jsonRes.userId))
          }
        } catch (err) {
          onOpenModal();
        }
      })
      .catch((err) => {
        console.log(err);
        onOpenModal();
      });
  };
  const onResetHandler = (UserName, Password) => {
    const payload = {
     email: reset,
   
    };
    fetch(`https://truewayagentbackend.com//send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(async (res) => {
     setMessage1("Check your email for instructions")
    })
    .catch((err) => {
      console.log(err);
      onOpenModal();
    });
  }
  return (
    <AuthComponent
      onSubmitHandler={onSubmitHandler}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      open={open}
      isError={isError}
      message={message}
      open1={open1}
      setOpen1={setOpen1}
      onOpenModal1={onOpenModal1} 
      reset={reset}
setReset={setReset}
    onCloseModal1={onCloseModal1}
    message1={message1}
setMessage1={setMessage1}
onResetHandler={onResetHandler}
    />
  );
};
export default Auth;
