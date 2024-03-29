import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PolicyNumberList from "../Components/policyNumberList";
import { GetLastPayments } from "../Logic/Fetch";
import PolicyNumberListLantana from "../Components/policyNumberListLantana";

const PolicyList = () => {
  const dispatch = useDispatch();
  const payments = useSelector((s) => s.Payments);
  const lastPayments = useSelector((s) => s.LastPayments);
  const companies = useSelector((s) => s.Companies);
  const [paginator, setPaginator] = useState(0);
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState();
  const [policyByName, setPolicyByName] = useState();
  const [monthlyPayments, setMonthlyPayments] = useState([]);
  const [totalMonthlyPayments, setTotalMonthlyPayments] = useState([]);
  const [totalRenew, setTotalRenew] = useState([]);
  const [totalEndorsement, setTotalEndorsement] = useState([]);
  const [paymentsOrder, setPaymentsOrder] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [searchDate, setSearchDate] = useState();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    GetLastPayments(dispatch);
  }, []);

  useEffect(() => {
    if (lastPayments) {
      const uniquePayments = Object.values(
        lastPayments?.reduce((temp, payment) => {
          const key = payment.policyNumber + payment.type + payment.date; // Concatenamos todas las propiedades relevantes
          if (!temp[key]) {
            temp[key] = payment;
          }
          return temp;
        }, {})
      )
        .filter((payment) => payment.type !== "Monthly Payment")
        ?.sort(function (a, b) {
          return b.id - a.id;
        })
        .filter(
          (e) =>
            e.policyNumber !== null &&
            e.policyNumber !== "" &&
            e.type !== "Monthly Payment"
        );
      setPaymentsOrder(uniquePayments);
    }
  }, [lastPayments]);

  console.log(monthlyPayments);
  useEffect(() => {
    console.log(paymentsOrder);
    if (filterOn === "") {
      if (policyByName?.length) {
        setPolicies(policyByName?.slice(paginator * 10, paginator * 10 + 10));
      } else {
        setPolicies(paymentsOrder?.slice(paginator * 10, paginator * 10 + 10));
      }
    } else if (filterOn === "TW1") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 1)
          .filter((e) => e.type === "Down Payment")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TW2") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 2)
          .filter((e) => e.type === "Down Payment")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "CC") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 3)
          .filter((e) => e.type === "Down Payment")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TOTAL") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.type === "Down Payment")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TW1END") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 1)
          .filter((e) => e.type === "Endorsement")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TW2END") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 2)
          .filter((e) => e.type === "Endorsement")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "CCEND") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 3)
          .filter((e) => e.type === "Endorsement")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TOTALEND") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.type === "Endorsement")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TW1RENEW") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 1)
          .filter((e) => e.type === "Renew Down")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TW2RENEW") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 2)
          .filter((e) => e.type === "Renew Down")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "CCRENEW") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 3)
          .filter((e) => e.type === "Renew Down")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TOTALRENEW") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.type === "Renew Down")
          .slice(paginator * 10, paginator * 10 + 10)
      );
    }
  }, [paginator, policyByName, paymentsOrder, filterOn]);

  useEffect(() => {
    const monthlyPayment1 = Object.values(
      monthlyPayments?.reduce((temp, payment) => {
        const key = payment.policyNumber + payment.type + payment.date; // Concatenamos todas las propiedades relevantes
        if (!temp[key]) {
          temp[key] = payment;
        }
        return temp;
      }, {})
    )
      ?.sort(function (a, b) {
        return b.id - a.id;
      })
      .filter(
        (e) =>
          e.policyNumber !== null &&
          e.policyNumber !== "" &&
          e.type !== "Monthly Payment" &&
          e.type === "Down Payment"
      );

    let totalTW1 = 0;
    let totalTW2 = 0;
    let totalCC = 0;
    monthlyPayment1.map((e) =>
      e.LocationId === 1
        ? (totalTW1 = totalTW1 + 1)
        : e.LocationId === 2
        ? (totalTW2 = totalTW2 + 1)
        : (totalCC = totalCC + 1)
    );
    setTotalMonthlyPayments([totalTW1, totalTW2, totalCC]);

    const monthlyRenew = Object.values(
      monthlyPayments?.reduce((temp, payment) => {
        const key = payment.policyNumber + payment.type + payment.date; // Concatenamos todas las propiedades relevantes
        if (!temp[key]) {
          temp[key] = payment;
        }
        return temp;
      }, {})
    )
      ?.sort(function (a, b) {
        return b.id - a.id;
      })
      .filter(
        (e) =>
          e.policyNumber !== null &&
          e.policyNumber !== "" &&
          e.type !== "Monthly Payment" &&
          e.type === "Renew Down"
      );

    let totalRenewTW1 = 0;
    let totalRenewTW2 = 0;
    let totalRenewCC = 0;
    monthlyRenew.map((e) =>
      e.LocationId === 1
        ? (totalRenewTW1 = totalRenewTW1 + 1)
        : e.LocationId === 2
        ? (totalRenewTW2 = totalRenewTW2 + 1)
        : (totalRenewCC = totalRenewCC + 1)
    );
    setTotalRenew([totalRenewTW1, totalRenewTW2, totalRenewCC]);

    const monthlyEndorsement = Object.values(
      monthlyPayments?.reduce((temp, payment) => {
        const key = payment.policyNumber + payment.type + payment.date; // Concatenamos todas las propiedades relevantes
        if (!temp[key]) {
          temp[key] = payment;
        }
        return temp;
      }, {})
    )
      ?.sort(function (a, b) {
        return b.id - a.id;
      })
      .filter(
        (e) =>
          e.policyNumber !== null &&
          e.policyNumber !== "" &&
          e.type !== "Monthly Payment" &&
          e.type === "Endorsement"
      );

    let totalEndorsementTW1 = 0;
    let totalEndorsementTW2 = 0;
    let totalEndorsementCC = 0;
    monthlyEndorsement.map((e) =>
      e.LocationId === 1
        ? (totalEndorsementTW1 = totalEndorsementTW1 + 1)
        : e.LocationId === 2
        ? (totalEndorsementTW2 = totalEndorsementTW2 + 1)
        : (totalEndorsementCC = totalEndorsementCC + 1)
    );
    setTotalEndorsement([
      totalEndorsementTW1,
      totalEndorsementTW2,
      totalEndorsementCC,
    ]);
  }, [monthlyPayments]);

  useEffect(() => {
    if (search?.length > 2) {
      fetch(
        `https://lantana.truewayagentbackend.com/getPolicyNumber?policyNumber=${search}`
      )
        .then((res) => res.json())
        .then((json) => {
          setPolicyByName(json);
        })
        .catch((err) => {
          console.log(err);
          setPolicyByName("Nothing");
        });
    } else {
      setPolicyByName();
    }
  }, [search]);

  const searchByDate = () => {
    fetch(
      `https://lantana.truewayagentbackend.com/getPolicyByDate?dateFrom=${dateFrom}&dateTo=${dateTo}`
    )
      .then((res) => res.json())
      .then((json) => {
        setSearchDate("Search");

        const uniquePayments = Object.values(
          json.reduce((temp, payment) => {
            const key = payment.policyNumber + payment.type + payment.date; // Concatenamos todas las propiedades relevantes
            if (!temp[key]) {
              temp[key] = payment;
            }
            return temp;
          }, {})
        )
          ?.sort(function (a, b) {
            return b.id - a.id;
          })
          .filter(
            (e) =>
              e.policyNumber !== null &&
              e.policyNumber !== "" &&
              e.type !== "Monthly Payment"
          );

        setPaymentsOrder(uniquePayments);
        setMonthlyPayments(uniquePayments);
      })
      .catch((err) => {
        console.log(err);
        setPaymentsOrder("Nothing");
      });
  };
  console.log(payments);
  useEffect(() => {
    setIsLoader(true);
    fetch(`https://lantana.truewayagentbackend.com/getMonthlyPayments`)
      .then((res) => res.json())
      .then((json) => {
        setMonthlyPayments(json);
        setIsLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoader(false);
        setMonthlyPayments([]);
      });
  }, []);

  let url = "https://lantana.truewayagentbackend.com";

  if (url.includes("lantana")) {
    return (
      <PolicyNumberListLantana
        payments={policies}
        setPaginator={setPaginator}
        paginator={paginator}
        companies={companies}
        setSearch={setSearch}
        totalMonthlyPayments={totalMonthlyPayments}
        filterOn={filterOn}
        setFilterOn={setFilterOn}
        isLoader={isLoader}
        totalRenew={totalRenew}
        totalEndorsement={totalEndorsement}
        setDateFrom={setDateFrom}
        searchByDate={searchByDate}
        setDateTo={setDateTo}
        dateFrom={dateFrom}
        dateTo={dateTo}
        searchDate={searchDate}
      />
    );
  } else {
    return (
      <PolicyNumberList
        payments={policies}
        setPaginator={setPaginator}
        paginator={paginator}
        companies={companies}
        setSearch={setSearch}
        totalMonthlyPayments={totalMonthlyPayments}
        filterOn={filterOn}
        setFilterOn={setFilterOn}
        isLoader={isLoader}
        totalRenew={totalRenew}
        totalEndorsement={totalEndorsement}
        setDateFrom={setDateFrom}
        searchByDate={searchByDate}
        setDateTo={setDateTo}
        dateFrom={dateFrom}
        dateTo={dateTo}
        searchDate={searchDate}
      />
    );
  }
};
export default PolicyList;
