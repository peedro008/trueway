import React, { useEffect, useState } from "react";
import useGoogleCharts from "../Charts/useGoogleCharts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ProducerDashboardComponent from "../Components/producerDashboard";

const ProducerDashboard = () => {
  const date = new Date();
  const DATE =
    date.getFullYear() +
    (date.getMonth() + 1 > 9 ? "-" : "-0") +
    (date.getMonth() + 1) +
    "-" +
    date.getDate();
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
  const user = useSelector((state) => state.User);
  const producers = useSelector((state) => state.Producers);
  const companies = useSelector((state) => state.Companies);
  const UserId = useSelector((state) => state.UserId);
  const avg = useSelector((state) => state.A_AVG?.find((e) => e.id === UserId));
  const [avgReload, setAvgReload] = useState(avg)
  // const modify = useSelector((state) => state.QuoteStatuses)?.filter(e=>e.UserId==user.userId);
  const [modify, setModify] = useState([]);
  const quotes = useSelector((state) => state.QuoteStatuses);
  const quotes2 = quotes?.filter((e) => e.UserId === UserId);
  
  
  useEffect(() => {
    axios
      .get(`https://truewayagentbackend.com/getUserStatusThisMonth?UserId=${user.userId}`)
      .then(function (response) {
        setModify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get(`https://truewayagentbackend.com/producerQuotesThisMonth?UserId=${user.userId}`)
      .then(function (response) {
        setPquotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get(`https://truewayagentbackend.com/getUserPayment?UserId=${user.userId}`)
      .then(function (response) {
        setPayments(
          response.data.filter(
            (e) => e.date.substring(0, 7) == DATE.substring(0, 7)
          )
        );
      })

      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    let pes = quotes2;
    let pas =
      pes &&
      pes?.filter(
        (e) =>
          e.QuoteStatuses?.sort(function (a, b) {
            return b.id - a.id;
          })[0].Status == "Quoted" ||
          e.QuoteStatuses?.sort(function (a, b) {
            return b.id - a.id;
          })[0].Status == "Cancelled"
      );
    // setStatus(pas);
  }, [quotes2]);

  useEffect(() => {
    let pes = [];
    pquotes?.map((e) => {
      let a = e.QuoteStatuses?.sort(function (a, b) {
        return a.id - b.id;
      }).reverse()[0].Status;
      pes.push(a);
    });
    setAsd(pes);
  }, [pquotes]);

  useEffect(() => {
    let temp = 0;
    payments?.map((e) => {
      if (e.Category) {
        if (e.Category?.name !== "HEALTH INSURANCE") {
          if (e.Category.id == 2) {
            temp += 10;
          }
          if (e.NSDvalue !== "") {
            temp +=
              5 *
              (e.NSDamount
                ? parseFloat(e.NSDamount)
                : parseFloat(e.NSDvalue) / parseFloat(e.Category.NSDvalue));
          }
        }
      }
    });
    pquotes.map((e) => {
      if (
        e.Categorye &&
        e.Category.id == 2 &&
        !e.Payment &&
        e.QuoteStatuses?.sort(function (a, b) {
          return b.id - a.id;
        })[0].Status == "Sold"
      ) {
        temp += 10;
      }
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
    let quotesUser = modify;
    producers?.map((e) =>
      pes.push([
        e.name,
        quo?.filter(
          (f) =>
            f.User.name == e.name &&
            f.QuoteStatuses?.sort(function (a, b) {
              return b.id - a.id;
            })[0].Status == "Sold"
        ).length,
        quo?.filter((i) => i.User.name == e.name).length,
        e,
      ])
    );

    // setDataList(pes?.sort(function (a, b) {
    //   return (b[1] / b[2]
    //   ? b[1] / b[2] > 1
    //     ? 100
    //     : ((b[1] / b[2]) * 100).toFixed(0)
    //   : 0)-( a[1] / a[2]
    //   ? a[1] / a[2] > 1
    //     ? 100
    //     : ((a[1] / a[2]) * 100).toFixed(0)
    //   : 0 );
    // }));
  }, [quotes2]);

  // const thisMonth = () => {
  //   const date = new Date();
  //   function sumarDias(fecha, dias) {
  //     const date = new Date(fecha);
  //     date.setDate(date.getDate() + dias);
  //     return date;
  //   }
  //   let yearBy = date.getFullYear();
  //   let monthBy = (date.getMonth() + 1 > 9 ? "-" : "-0") + (date.getMonth() + 1);
  //   let yearTo = date.getFullYear();
  //   let monthTo = (date.getMonth() + 2 > 9 ? "-" : "-0") + (date.getMonth() + 2);

  //   if (monthTo === "-13") {monthTo = "-01"; yearTo = date.getFullYear() + 1};

  //   const DATE1 = yearBy + monthBy + "-01";
  //   const DATE2 = yearTo + monthTo + "-01";

  //   setDateBy(DATE1)
  //   setDateTo(DATE2)
  // }

  //  useEffect(() => {
  //    thisMonth()
  //  }, [])

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
      userId={user.userId}
      companies={companies}
      avg={avg}
    />
  );
};

export default ProducerDashboard;
