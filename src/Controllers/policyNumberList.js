import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PolicyNumberList from "../Components/policyNumberList";
const PolicyList = () => {
  const payments= useSelector(s=>s.Payments)
  const [paginator, setPaginator] = useState(0);
const [policies, setPolicies] = useState([])
  

  useEffect(() => {
    const policyNumber = payments.filter(e => e.policyNumber !== null)
const policyNumber2 = policyNumber.filter(e => e.policyNumber !== '')
setPolicies(policyNumber2.slice(paginator * 10, paginator * 10 + 10))


  }, [paginator])
  

console.log(policies) 
  return (
    <PolicyNumberList
    payments={policies}
    setPaginator={setPaginator}
    paginator={paginator}
    />
  );
};

export default PolicyList;
