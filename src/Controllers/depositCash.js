import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepositCashComponent from "../Components/depositCash";
import { getDeposits } from "../Redux/actions";

const DepositCash = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [box, setBox] = useState({
    pay1: "",
    pay5: "",
    pay10: "",
    pay20: "",
    pay50: "",
    pay100: "",
  });
  const [dbPayments, setDbPayments] = useState([]);
  const [total, setTotal] = useState(0);
  const [id, setId] = useState([]);
  const dispatch = useDispatch();
  const UserId = useSelector((state) => state.UserId);
  const LocationId = useSelector((state) => state.LocationId);
  const [note, setNote] = useState("");

  console.log(LocationId);
  useEffect(() => {
    axios
      .get(
        `https://lantana.truewayagentbackend.com/getCashPayment?LocationId=${LocationId}`
      )
      .then(function (response) {
        setDbPayments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log(
      `$1: ${box.pay1}, $5: ${box.pay5}, $10: ${box.pay10}, $20: ${box.pay20}, $50: ${box.pay50}, $100: ${box.pay100}. ${box.note} `
    );
  }, [box]);
  useEffect(() => {
    let amount = 0;
    dbPayments.map(
      (e) =>
        (amount +=
          parseFloat(e.amount) +
          (e.creditCardFee.length ? parseFloat(e.creditCardFee) : 0) +
          parseFloat(e.PIPvalue) +
          parseFloat(e.MVRvalue) +
          parseFloat(e.NSDvalue))
    );
    setTotal(amount);
    let ids = [];
    dbPayments.map((e) => ids.push(e.id));
    setId(ids);
  }, [dbPayments]);

  const submit = () => {
    let data = {
      id: id,
      UserId: UserId,
      LocationId: LocationId,
      note: `$1: ${box.pay1 ? box.pay1 : 0}, $5: ${
        box.pay5 ? box.pay5 : 0
      }, $10: ${box.pay10 ? box.pay10 : 0}, $20: ${
        box.pay20 ? box.pay20 : 0
      }, $50: ${box.pay50 ? box.pay50 : 0}, $100: ${
        box.pay100 ? box.pay100 : 0
      }. ${box.note ? box.note : ""} `,
      total:
        Number(box.pay1) +
        Number(box.pay5) * 5 +
        Number(box.pay10) * 10 +
        Number(box.pay20) * 20 +
        Number(box.pay50) * 50 +
        Number(box.pay100) * 100,
    };
    onOpenModal();
    fetch(`https://lantana.truewayagentbackend.com/deposit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((a) => {
      axios
        .get(`https://lantana.truewayagentbackend.com/getDeposit`)
        .then(function (response) {
          dispatch(getDeposits(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <DepositCashComponent
      open={open}
      box={box}
      setBox={setBox}
      submit={submit}
      dbPayments={dbPayments}
      total={total}
      id={id}
      note={note}
      setNote={setNote}
      onCloseModal={onCloseModal}
    />
  );
};

export default DepositCash;
