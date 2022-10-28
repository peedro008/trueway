
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import DRdetailsComponent from "../Components/DRdetails";


function DRdetails(props) {
  let papa = props.location.props.Payments;
  const [payments, setPayments] = useState(papa);
  const [producers, setProducers] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const UserId = useSelector((state) => state.UserId);
  const LocationId = useSelector((state) => state.LocationId);
  const [total, setTotal] = useState(0);
  const [paymentsFil, setPaymentsFil] = useState(papa);
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [EFT, setEFT] = useState(0);
  const [checkbox, setCheckbox] = useState({
      Cash: false,
      EFT: false,
      CDC: false
  });
  const checkCash = () => {
    if(checkbox.Cash){
    setPaymentsFil(payments)
    setCheckbox({
      Cash: false,
        EFT: false,
        CDC: false})}
        else{
    let list = payments.filter(e=>e.method=="Cash")
    setPaymentsFil(list)
    setCheckbox({
      Cash: true,
        EFT: false,
        CDC: false})}
    }
const checkEFT = () => {
  if(checkbox.EFT){
    setPaymentsFil(payments)
    setCheckbox({
      Cash: false,
        EFT: false,
        CDC: false})}
        else{
    let list = payments.filter(e=>e.method=="EFT")
    setPaymentsFil(list)
    setCheckbox({Cash: false,
        EFT: true,
        CDC: false})}
    }

const checkCDC = () => {
  if(checkbox.CDC){
    setPaymentsFil(payments)
    setCheckbox({
      Cash: false,
        EFT: false,
        CDC: false})}
        else{
    let list = payments.filter(e=>e.method=="credit/debit")
    setPaymentsFil(list)
    setCheckbox({
        Cash: false,
        EFT: false,
        CDC: true})
    }}


  useEffect(() => {
    let CA = 0;
    let CR = 0;
    let EF = 0;
    let paz = paymentsFil;
    paz.map((h) => {
      h.method == "Cash"
        ? (CA += parseFloat(
            parseFloat(h.amount) +
              parseFloat(h.creditCardFee) +
              parseFloat(h.NSDvalue) +
              parseFloat(h.MVRvalue) +
              parseFloat(h.PIPvalue)
          ))
        : h.method == "EFT"
        ? (EF += parseFloat(
            parseFloat(h.amount) +
              parseFloat(h.creditCardFee) +
              parseFloat(h.NSDvalue) +
              parseFloat(h.MVRvalue) +
              parseFloat(h.PIPvalue)
          ))
        : (CR += parseFloat(
            parseFloat(h.amount) +
              parseFloat(h.creditCardFee) +
              parseFloat(h.NSDvalue) +
              parseFloat(h.MVRvalue) +
              parseFloat(h.PIPvalue)
          ));
    });
    setCash(CA);
    setCredit(CR);
    setEFT(EF);
  }, [paymentsFil]);
  useEffect(() => {
    let TOTAL = 0;
    paymentsFil.map((h) => {
      TOTAL =
        TOTAL +
        (parseFloat(h.amount) +
          parseFloat(h.creditCardFee) +
          parseFloat(h.NSDvalue) +
          parseFloat(h.MVRvalue) +
          parseFloat(h.PIPvalue));
    });
    setTotal(TOTAL);
  }, [paymentsFil]);
  let pes = [];
  let DATE = "";
  useEffect(() => {
    paymentsFil.map((e) => {
      if (!pes.filter((f) => f.name == e.User.name).length) {
        pes.push({ name: e.User.name, location: e.Location.name });
      }
    });

    setProducers(pes);
    payments.map((e) => {
      if (!DATE) {
        DATE = e.date;
      }
      setDate(DATE);
    });
  }, [paymentsFil]);

  return (
        <DRdetailsComponent
        payments={payments}
        paymentsFil={paymentsFil}
        cash={cash}
        credit={credit}
        EFT={EFT}
        producers={producers}
        search={search}
        date={date}
        total={total}
        checkbox={checkbox}
        setPayments={setPayments}
        setPaymentsFil={setPaymentsFil}
        setCash={setCash}
        setCredit={setCredit}
        setEFT={setEFT}
        setProducers={setProducers}
        setSearch={setSearch}
        setDate={setDate}
        setTotal={setTotal}
        setCheckbox={setCheckbox}
        UserId={UserId}
        LocationId={LocationId}
        checkCash={checkCash}
        checkEFT={checkEFT}
        checkCDC={checkCDC}
        />
  );
}

export default DRdetails;
