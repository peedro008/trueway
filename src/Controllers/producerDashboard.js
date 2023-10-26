import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
  const [pquotes, setPquotes] = useState([]);
  const [payments, setPayments] = useState([]);
  const user = useSelector((state) => state.User);
  const producers = useSelector((state) => state.Producers);
  const UserId = useSelector((state) => state.UserId);
  const quotes = useSelector((state) => state.QuoteStatuses);
  const quotes2 = quotes?.filter((e) => e.UserId === UserId);

  useEffect(() => {
    axios
      .get(
        `https://lantana.truewayagentbackend.com/producerQuotesThisMonth?UserId=${user.userId}`
      )
      .then(function (response) {
        setPquotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get(
        `https://lantana.truewayagentbackend.com/getUserPayment?UserId=${user.userId}`
      )
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
    let pes = [];
    let quo = quotes2;
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
  }, [quotes2]);

  return (
    <ProducerDashboardComponent
      NSD={NSD}
      pquotes={pquotes}
      payments={payments}
      user={user}
    />
  );
};

export default ProducerDashboard;
