import React, { useEffect, useState } from "react";
import useGoogleCharts from "../Charts/useGoogleCharts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProducerDashboardComponent from "../Components/producerDashboard";

const ProducerDashboard = () => {
  const date = new Date();
  const DATE =
    date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
  const [NSD, setNSD] = useState(null);
  const [asd, setAsd] = useState([]);
  const [pquotes, setPquotes] = useState([]);
  const [uQuotes, setUQuotes] = useState(0);
  const [sQuotes, setSQuotes] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [status, setStatus] = useState([]);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();
  const google = useGoogleCharts();
  const userId = useSelector((state) => state.UserId);
  const producers = useSelector((state) => state.Producers);
  const UserId = useSelector((state) => state.UserId);
  const modify = useSelector((state) => state.QuoteStatuses)?.filter(e=>e.UserId==userId);
  const quotes2 = useSelector((state) => state.Quotes);


  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/producerQuotes?UserId=${userId}`)
      .then(function (response) {
        setPquotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/getUserPayment?UserId=${userId}`)
      .then(function (response) {
        setPayments(response.data.filter(e=>e.date.substring(0, 7) == DATE.substring(0, 7)));
      })

      .catch((error) => {
        console.log(error);
      });
  }, [userId, DATE]);



  useEffect(() => {
    let pes = quotes2;
    let pas = pes&&pes.filter(
      (e) =>
        e.QuoteStatuses.sort(function (a, b) {
          return a.id - b.id;
        }).reverse()[0].Status == "Quoted" ||
        e.QuoteStatuses.sort(function (a, b) {
          return a.id - b.id;
        }).reverse()[0].Status == "Cancelled"
    );
    setStatus(pas);
  }, [quotes2]);
  useEffect(() => {
    let pes = [];
    pquotes.map((e) => {
      let a = e.QuoteStatuses.sort(function (a, b) {
        return a.id - b.id;
      }).reverse()[0].Status;
      pes.push(a);
    });
    setAsd(pes);
  }, [pquotes]);

  useEffect(() => {
    let temp = 0;
    payments?.filter(f=>f.User.id==UserId).map((e) => {
      temp +=parseFloat(e.NSDvalue);
    });
    setNSD(temp);
  }, [payments]);

  useEffect(() => {
    let pes = 0;
    let pas = 0;
    asd.map((e) => {
      if (e == "Quoted" || e == "Cancelled") {
        pes = pes + 1;
      } else {
        pas = pas + 1;
      }
    });
    setSQuotes(pas);
    setUQuotes(pes);
  }, [asd]);

  useEffect(() => {
    let pes = [];
    let quo = quotes2;

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
    
  }, [modify, producers, quotes2]);



  return (
    <ProducerDashboardComponent
      NSD={NSD}
      setNSD={setNSD}
      asd={asd}
      setAsd={setAsd}
      pquotes={pquotes}
      setPquotes={setPquotes}
      uQuotes={uQuotes}
      setUQuotes={setUQuotes}
      sQuotes={sQuotes}
      setSQuotes={setSQuotes}
      dataList={dataList}
      setDataList={setDataList}
      status={status}
      setStatus={setStatus}
      payments={payments}
      setPayments={setPayments}
      dispatch={dispatch}
      google={google}
      producers={producers}
      UserId={UserId}
      modify={modify}
      quotes2={quotes2}
      userId={userId}
    />
  );
};

export default ProducerDashboard;
