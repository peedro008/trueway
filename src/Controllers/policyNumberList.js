import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PolicyNumberList from "../Components/policyNumberList";
const PolicyList = () => {
  const payments= useSelector(s=>s.Payments)

const policyNumber = payments.filter(e => e.policyNumber !== null)

  return (
    <PolicyNumberList
    payments={policyNumber}

    />
  );
};

export default PolicyList;
