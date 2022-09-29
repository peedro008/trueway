import React, { useEffect, useState } from "react";

import useGoogleCharts from "../Charts/useGoogleCharts";
import axios from "axios";

import { useSelector } from "react-redux";
import AdminDashboardComponent from "../Components/adminDashboard";

const AdminDashboard = () => {
  const date = new Date();
  const DATE =
    date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
    const [mModify, setMModify]=useState([])
  const [mquotes, setMQuotes]=useState([])
  const [next, setNext] = useState(false);
  const [asd, setAsd] = useState(false);

  const [dataList, setDataList] = useState([]);
  const [sold, setSold] = useState([]);
  const [unSold, setUnSold] = useState([]);
  const [modifiedList, setModifiedList] = useState([]);
  const [NSD, setNSD] = useState(0);
  const [mpayments, setMpayments] = useState(0);
  const google = useGoogleCharts();
  const producers = useSelector((state) => state.Producers);
  const UserId = useSelector((state) => state.UserId);
  const modify = useSelector((state) => state.QuoteStatuses);
  const userRole = useSelector((state) => state.userRole);
  const quotes = useSelector((state) => state.Quotes);
  const payments = useSelector((state) => state.Payments);

  useEffect(() => {
    let temp = [];
    let pes = [];
    modify?.sort(function (a, b) {
        return b.id - a.id;
      })?.map((e) => {
        if (!pes.includes(e.Quote.id) && e.Status !== "-") {
          temp.push(e);
          pes.push(e.Quote.id);
        }
      });
    setModifiedList(temp);
  }, [modify]);

  useEffect(() => {
    setMpayments(payments?.filter(e=>e.date.substring(0, 7) == DATE.substring(0, 7)))
  }, [payments]);




  useEffect(() => {
    let pes = [];
    let quo = quotes;

    let q = modify;
    producers?.map((e) =>
      pes.push([
        e.name,
        quo?.filter((f) => f.User.name == e.name && f.QuoteStatuses.sort(function (a, b) {
          return b.id - a.id ;
        })[0].Status == "Sold").length,
        quo?.filter(
          (i) =>
            i.User.name == e.name 
        ).length,
        e,
      ])
    );
    
    setDataList(pes.sort(function (a, b) {
      return (b[1] / b[2]
      ? b[1] / b[2] > 1
        ? 100
        : ((b[1] / b[2]) * 100).toFixed(0)
      : 0)-( a[1] / a[2]
      ? a[1] / a[2] > 1
        ? 100
        : ((a[1] / a[2]) * 100).toFixed(0)
      : 0 );
    }));
    
  }, [modify, producers, quotes]);
  useEffect(() => {
    setMQuotes(quotes?.filter((e) => e.date.substring(0, 7) == DATE.substring(0, 7)))
    setMModify(modify?.filter((e) => e.Quote.date.substring(0, 7) == DATE.substring(0, 7)))

 
  }, [quotes, DATE]);

  //NSD
  useEffect(() => {
    let temp = 0;
    userRole=="Admin"?
    payments?.filter(e=>e.date.substring(0, 7) == DATE.substring(0, 7))?.map((e,i) => {
    
      temp +=   parseFloat(e.NSDvalue)?parseFloat(e.NSDvalue):0
    }):
    payments?.filter(f=>(f.UserId==UserId&&f.date.substring(0, 7) == DATE.substring(0, 7))).map((e) => {
      temp += parseFloat(e.NSDvalue)?parseFloat(e.NSDvalue):0
    })
    setNSD(temp);
  }, [payments, userRole]);

  const handleNext = (e) => {
    setNext(!next);
    e.preventDefault();
  };

  return (
    <AdminDashboardComponent
      next={next}
      setNext={setNext}
      asd={asd}
      setAsd={setAsd}
      dataList={dataList}
      setDataList={setDataList}
      sold={sold}
      setSold={setSold}
      unSold={unSold}
      setUnSold={setUnSold}
      modifiedList={modifiedList}
      setModifiedList={setModifiedList}
      NSD={NSD}
      setNSD={setNSD}
      producers={producers}
      google={google}
      UserId={UserId}
      modify={modify}
      quotes={quotes}
      payments={payments}
      handleNext={handleNext}
      mquotes={mquotes}
      mModify={mModify}
      mpayments={mpayments}
    />
  );
};

export default AdminDashboard;
