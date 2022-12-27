import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PolicyNumberList from "../Components/policyNumberList";

const PolicyList = () => {
  const payments = useSelector((s) => s.Payments);
  const companies = useSelector((s) => s.Companies);
  const [paginator, setPaginator] = useState(0);
  const [policies, setPolicies] = useState([]);
  const [search, setSearch] = useState();
  const [policyByName, setPolicyByName] = useState();

console.log(policies)
  const paymentsOrder = payments?.sort(function (a, b) {
    return b.id - a.id;
  });
  useEffect(() => {
    const policyNumber = paymentsOrder?.filter((e) => e.policyNumber !== null);
    const policyNumber2 = policyNumber?.filter((e) => e.policyNumber !== "");
    if (policyByName?.length) {
      setPolicies(policyByName?.slice(paginator * 10, paginator * 10 + 10));
    } else {
    setPolicies(policyNumber2?.slice(paginator * 10, paginator * 10 + 10));
}}, [paginator, policyByName]);

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
