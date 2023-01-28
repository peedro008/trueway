import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PolicyNumberList from "../Components/policyNumberList";
import { GetLastPayments } from "../Logic/Fetch";

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
  const [paymentsOrder, setPaymentsOrder] = useState([]);
  const [filterOn, setFilterOn] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  console.log(monthlyPayments);
  useEffect(() => {
    GetLastPayments(dispatch);
  }, []);

  useEffect(() => {
    setPaymentsOrder(
      lastPayments
        ?.sort(function (a, b) {
          return b.id - a.id;
        })
        .filter(
          (e) =>
            e.policyNumber !== null &&
            e.policyNumber !== "" &&
            e.type !== "Monthly Payment"
        )
    );
  }, [lastPayments]);

  useEffect(() => {
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
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else if (filterOn === "TW2") {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 2)
          .slice(paginator * 10, paginator * 10 + 10)
      );
    } else {
      setPolicies(
        paymentsOrder
          ?.filter((e) => e.LocationId === 3)
          .slice(paginator * 10, paginator * 10 + 10)
      );
    }
  }, [paginator, policyByName, paymentsOrder, filterOn]);

  console.log(totalMonthlyPayments);

  useEffect(() => {
    const monthlyPayment1 = monthlyPayments?.filter(
      (e) =>
        e.policyNumber !== null &&
        e.policyNumber !== "" &&
        e.type !== "Monthly Payment"
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
  }, [monthlyPayments]);

  useEffect(() => {
    if (search?.length > 2) {
      fetch(
        `https://truewayagentbackend.com/getPolicyNumber?policyNumber=${search}`
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

  useEffect(() => {
    setIsLoader(true);
    fetch(`https://truewayagentbackend.com/getMonthlyPayments`)
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
    />
  );
};

export default PolicyList;
