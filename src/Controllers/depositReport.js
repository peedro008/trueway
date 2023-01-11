import React, { useEffect, useState } from "react";

import moment from "moment";

import DepositReportComponent from "../Components/depositReport";
import { useSelector } from "react-redux";
const DepositReport = () => {
  const [depositsFil, setDepositsFil] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const deposits = useSelector((state) => state.Deposits);
  const [depositsTotal, setDepositsTotal] = useState(deposits)
  const [filteredQuotes, setFilteredQuotes] = useState(false);
  const locations = useSelector((state) => state.Locations);
  const [filterValues, setFilterValues] = useState({
    dateFrom: null,
    LocationId: null,
  });
  const [filterCheck, setFilterCheck] = useState({
    date: false,
    LocationId: false,
  });

//   useEffect(() => {
//     let totalSold = 0
//     deposits.map(e => e.Payments.map(f => totalSold = totalSold + f.amount))
//     setDepositsTotal( totalSold)
//   }, [deposits])
//   console.log(deposits)

  const filterSubmit = (e) => {
    let temp = deposits;

    if (e.dateFrom && e.dateTo) {
      temp = temp.filter((h) =>
        moment(`${h.date}`).isBetween(
          `${e.dateFrom}`,
          `${e.dateTo}`,
          undefined,
          "[]"
        )
      );
    }

    if (e.LocationId) {
      temp = temp.filter((h) => h.LocationId == e.LocationId);
    }

    setDepositsFil(temp);
  };

  useEffect(() => {
    filterSubmit(filterValues);
  }, [filterValues, deposits]);
  const closeCloud = (e) => {
    setFilterValues(e);
  };

  return (
    <DepositReportComponent
      deposits={deposits}
      depositsFil={depositsFil}
      closeCloud={closeCloud}
      filterSubmit={filterSubmit}
      setDepositsFil={setDepositsFil}
      locations={locations}
      filteredQuotes={filteredQuotes}
      setFilteredQuotes={setFilteredQuotes}
      openFilter={openFilter}
      setOpenFilter={setOpenFilter}
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      filterCheck={filterCheck}
      setFilterCheck={setFilterCheck}
    />
  );
};
export default DepositReport;
