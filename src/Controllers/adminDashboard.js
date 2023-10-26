import React, { useEffect, useState } from "react";

import useGoogleCharts from "../Charts/useGoogleCharts";
import axios from "axios";

import { useSelector } from "react-redux";
import AdminDashboardComponent from "../Components/adminDashboard";

const AdminDashboard = () => {
  const date = new Date();
  const DATE =
    date.getFullYear() +
    (date.getMonth() + 1 > 9 ? "-" : "-0") +
    (date.getMonth() + 1) +
    "-" +
    date.getDate();

  const [mModify, setMModify] = useState([]);
  const [mquotes, setMQuotes] = useState([]);
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
  const [payments, setPayments] = useState([]);
  const quotex = useSelector((s) => s.AVG);
  const A_AVG = useSelector((s) => s.A_AVG);
  const Payment = useSelector((state) => state.Payments);
  const [loading, setLoading] = useState(true);
  const [cuotitas, setCuotitas] = useState([]);
  const quotexWithoutDeleted = quotex?.filter((e) => e.deleted == false);
  const A_AVGWithoutDeleted = A_AVG?.filter((e) => e.deleted == false);

  useEffect(() => {
    let tempS = 0;
    let tempU = 0;
    A_AVGWithoutDeleted?.map((e) => {
      tempS += e.sold;
      tempU += e.unsold;
    });
    setSold(tempS);
    setUnSold(tempU);
  }, [A_AVG]);

  useEffect(() => {
    getQuoteStatuses();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      let temp = [];
      let pes = [];
      {
        cuotitas
          ?.sort(function (a, b) {
            return b.id - a.id;
          })
          .splice(0, 20)
          ?.map((e) => {
            if (!pes.includes(e.Quote.id) && e.Status !== "-") {
              temp.push(e);
              pes.push(e.Quote.id);
            }
          });
        setModifiedList(temp);
      }
    }, 500);
  }, [cuotitas]);

  const getQuoteStatuses = () => {
    fetch(`https://lantana.truewayagentbackend.com/getStatus`)
      .then((res) => res.json())
      .then((json) => setCuotitas(json))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `https://lantana.truewayagentbackend.com/getUserPayment?UserId=${UserId}`
      )
      .then(function (response) {
        setPayments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [UserId]);

  useEffect(() => {
    setMpayments(
      payments?.filter((e) => e.date.substring(0, 7) == DATE.substring(0, 7))
    );
  }, [payments]);

  useEffect(() => {
    setMQuotes(
      quotes?.filter((e) => e.date.substring(0, 4) == DATE.substring(0, 4))
    );
    setMModify(
      modify?.filter(
        (e) => e.Quote.date.substring(0, 7) == DATE.substring(0, 7)
      )
    );
  }, [quotes, DATE]);

  //NSD
  useEffect(() => {
    let temp = 0;
    userRole == "Admin"
      ? Payment?.filter(
          (e) => e.date.substring(0, 7) == DATE.substring(0, 7)
        )?.map((e, i) => {
          temp += parseFloat(e.NSDvalue) ? parseFloat(e.NSDvalue) : 0;
        })
      : payments?.map((e) => {
          if (e.Category.name !== "HEALTH INSURANCE") {
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
        });
    quotes
      ?.filter(
        (f) =>
          f.UserId == UserId && f.date.substring(0, 7) == DATE.substring(0, 7)
      )
      .map((e) => {
        if (
          e.Category.id == 2 &&
          !e.Payment &&
          e.QuoteStatuses.sort(function (a, b) {
            return b.id - a.id;
          })[0].Status == "Sold"
        ) {
          temp += 10;
        }
      });

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
      userRole={userRole}
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
      quotex={quotexWithoutDeleted}
      modify={modify}
      quotes={quotes}
      payments={payments}
      handleNext={handleNext}
      mquotes={mquotes}
      mModify={mModify}
      mpayments={mpayments}
      Payment={Payment}
      DATE={DATE}
      A_AVG={A_AVGWithoutDeleted}
      loading={loading}
    />
  );
};

export default AdminDashboard;
