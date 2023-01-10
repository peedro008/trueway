import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PolicyNumberList from "../Components/policyNumberList";
import { GetLastPayments } from "../Logic/Fetch";

const PolicyList = () => {
  const dispatch = useDispatch();
  const payments = useSelector((s) => s.Payments);
  const lastPayments = useSelector((s) => s.LastPayments)
  const companies = useSelector((s) => s.Companies);
  const [paginator, setPaginator] = useState(0);
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState();
  const [policyByName, setPolicyByName] = useState();
  const [paymentsOrder, setPaymentsOrder] = useState([])

console.log(policies)
useEffect(() => {
  GetLastPayments(dispatch)
}, [])

useEffect(() => {
  setPaymentsOrder(lastPayments?.sort(function (a, b) {
    return b.id - a.id;
  }));
}, [lastPayments])

  
  useEffect(() => {
    const policyNumber = paymentsOrder?.filter((e) => e.policyNumber !== null);
    const policyNumber2 = policyNumber?.filter((e) => e.policyNumber !== "");
    const policyNumber3 = policyNumber2?.filter((e) => e.type !== "Monthly Payment");
    if (policyByName?.length) {
      setPolicies(policyByName?.slice(paginator * 10, paginator * 10 + 10));
    } else {
    setPolicies(policyNumber3?.slice(paginator * 10, paginator * 10 + 10));
}}, [paginator, policyByName,paymentsOrder]);

  useEffect(() => {
    if (search?.length > 2) {
      fetch(`https://truewayagentbackend.com/getPolicyNumber?policyNumber=${search}`)
        .then((res) => res.json())
        .then((json) => {
          setPolicyByName(json);
        }).catch(err => {console.log(err); setPolicyByName('Nothing')});
    } else {
      setPolicyByName();
    }
  }, [search]);

  useEffect(() => {
    
  }, [policyByName])
  

  return (
    <PolicyNumberList
      payments={policies}
      setPaginator={setPaginator}
      paginator={paginator}
      companies={companies}
      setSearch={setSearch}
    />
  );
};

export default PolicyList;
