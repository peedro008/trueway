import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import GenericReportComponent from "../Components/genericReport";

function GenericReport(props) {
  let data = props.location?.aboutProps;

  const [paymentsFil, setPaymentsFil] = useState(data.items);
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [EFT, setEFT] = useState(0);
  console.log(data);
  const [total, setTotal] = useState(0);
  const [checkbox, setCheckbox] = useState({
    Cash: false,
    EFT: false,
    CDC: false,
  });
  const users = useSelector((e) => e.Users);
  const checkCash = () => {
    if (data.type == "P") {
      if (checkbox.Cash) {
        setPaymentsFil(data.items);
        setCheckbox({
          Cash: false,
          EFT: false,
          CDC: false,
        });
      } else {
        let list = data.items.filter((e) => e.method == "Cash");
        setPaymentsFil(list);
        setCheckbox({
          Cash: true,
          EFT: false,
          CDC: false,
        });
      }
    }
  };
  const checkEFT = () => {
    if (data.type == "P") {
      if (checkbox.EFT) {
        setPaymentsFil(data.items);
        setCheckbox({
          Cash: false,
          EFT: false,
          CDC: false,
        });
      } else {
        let list = data.items.filter((e) => e.method == "EFT");
        setPaymentsFil(list);
        setCheckbox({ Cash: false, EFT: true, CDC: false });
      }
    }
  };

  const checkCDC = () => {
    if (data.type == "P")
      if (checkbox.CDC) {
        setPaymentsFil(data.items);
        setCheckbox({
          Cash: false,
          EFT: false,
          CDC: false,
        });
      } else {
        let list = data.items.filter((e) => e.method == "credit/debit");
        setPaymentsFil(list);
        setCheckbox({
          Cash: false,
          EFT: false,
          CDC: true,
        });
      }
  };

  useEffect(() => {
    let CA = 0;
    let CR = 0;
    let EF = 0;
    let paz = paymentsFil;
    paz.map((h) => {
      h.method == "Cash"
        ? (CA += Number(
            Number(h.amount)
              ? Number(h.amount)
              : 0 + Number(h.creditCardFee)
              ? Number(h.creditCardFee)
              : 0 + Number(h.NSDvalue)
              ? Number(h.NSDvalue)
              : 0 + Number(h.MVRvalue)
              ? Number(h.MVRvalue)
              : 0 + Number(h.PIPvalue)
              ? Number(h.PIPvalue)
              : 0
          ))
        : h.method == "EFT"
        ? (EF += Number(
            Number(h.amount)
              ? Number(h.amount)
              : 0 + Number(h.creditCardFee)
              ? Number(h.creditCardFee)
              : 0 + Number(h.NSDvalue)
              ? Number(h.NSDvalue)
              : 0 + Number(h.MVRvalue)
              ? Number(h.MVRvalue)
              : 0 + Number(h.PIPvalue)
              ? Number(h.PIPvalue)
              : 0
          ))
        : (CR += Number(
            Number(h.amount)
              ? Number(h.amount)
              : 0 + Number(h.creditCardFee)
              ? Number(h.creditCardFee)
              : 0 + Number(h.NSDvalue)
              ? Number(h.NSDvalue)
              : 0 + Number(h.MVRvalue)
              ? Number(h.MVRvalue)
              : 0 + Number(h.PIPvalue)
              ? Number(h.PIPvalue)
              : 0
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
          (Number(h.NSDvalue) ? Number(h.NSDvalue) : 0) +
          parseFloat(h.MVRvalue) +
          parseFloat(h.PIPvalue));
    });
    setTotal(TOTAL);
  }, [paymentsFil]);
  return (
    <GenericReportComponent
      data={data}
      items={data.items}
      type={data.type}
      title={data.title}
      producer={data.producer}
      paymentsFil={paymentsFil}
      checkCash={checkCash}
      checkEFT={checkEFT}
      checkCDC={checkCDC}
      cash={cash}
      setCash={setCash}
      credit={credit}
      setCredit={setCredit}
      EFT={EFT}
      setEFT={setEFT}
      checkbox={checkbox}
      setCheckbox={setCheckbox}
      total={total}
      setTotal={setTotal}
      users={users}
    />
  );
}

export default GenericReport;
