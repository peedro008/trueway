import React, { useEffect, useState } from "react";
import Isologo_background from "../assets/Isologo_background.png";
import { AiOutlineDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import spinnerr from "../assets/loadingIcon.gif";
import "../Css/css.css";
import { BiSearchAlt2 } from "react-icons/bi";

const PolicyNumberList = ({
  payments,
  paginator,
  setPaginator,
  companies,
  setSearch,
  totalMonthlyPayments,
  totalRenew,
  totalEndorsement,
  filterOn,
  setFilterOn,
  isLoader,
  setDateTo,
  setDateFrom,
  searchByDate,
  dateFrom,
  dateTo,
  searchDate,
}) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const month = monthNames[d.getMonth()];

  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Binder</p>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="inputSearchPolicy"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "start",
          }}
        >
          <p className="AQinputName">Date From</p>
          <input
            type={"date"}
            className="AQinput"
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div
          className="inputSearchPolicy"
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "start",
            marginLeft: "0px",
          }}
        >
          <p className="AQinputName">Date To</p>
          <input
            type={"date"}
            className="AQinput"
            onChange={(e) => setDateTo(e.target.value)}
          />{" "}
        </div>
        <button
          // className={addingQuote ? "PAYbuttonPayWaiting" : "PAYbuttonPay"}
          onClick={() => searchByDate()}
          className={
            dateFrom && dateTo ? "PAYbuttonPay" : "PAYbuttonPayWaiting"
          }
          style={{ marginTop: "20px" }}
        >
          <p className="PAYbuttonText" style={{ marginBottom: "5px" }}>
            Search
          </p>
        </button>
      </div>
      <div style={{ marginBottom: "100px", marginTop: "40px" }}>
        <table
          className="table2"
          style={{ minWidth: "90vw", maxWidth: "90vw" }}
        >
          <thead>
            <tr>
              <th scope="col" className="column1">
                <p className="REPtype2">Policy Number</p>
              </th>
              <th scope="col" className="column1" style={{ width: "100px" }}>
                <p className="REPtype2">Date</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Time</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Client Name</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Company</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Address</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Type</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Total Premium</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Coverage (NSD)</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Effective Date</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Expiration Date</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {payments === "Nothing" ? (
              <> </>
            ) : (
              payments
                ?.sort(function (a, b) {
                  return b.id - a.id;
                })
                .map((e) => {
                  return (
                    <tr>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e?.policyNumber || " "}
                      </td>

                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e?.date}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e.time?.slice(11, 16)}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e.Client?.name}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e.Quote !== null
                          ? companies?.find((f) => f.id === e.Quote?.CompanyId)
                              ?.name
                          : companies?.find((f) => f.id === Number(e.CompanyId))
                              ?.name}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e.Client?.address || " "}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e?.type}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        $
                        {/* {e?.Quote !== null
                          ? Number(e.Quote?.totalPremium) +
                            Number(e?.increasePremium)
                          :  */}
                        {Number(e?.increasePremium)}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        $ {e?.NSDvalue}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e?.effectiveDate}
                      </td>
                      <td scope="row" style={{ fontWeight: "bold" }}>
                        {e?.expirationDate}
                      </td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
      {isLoader ? (
        <img
          src={spinnerr}
          style={{
            width: "100px",
            marginLeft: "60px",
          }}
        />
      ) : (
        <>
          <div className="dashContCard2">
            <div
              onClick={() => {
                setFilterOn("TW1");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor:
                  filterOn === "TW1"
                    ? " rgba(0, 39, 82,0.6)"
                    : " rgba(0, 39, 82,0.8)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TW 1</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Down P. {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Trueway 1
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalMonthlyPayments[0]}
                </p>
              </div>
            </div>
            <div
              className="dashCard"
              onClick={() => {
                setFilterOn("TW2");
                setPaginator(0);
              }}
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor:
                  filterOn === "TW2"
                    ? " rgba(0, 39, 82,0.6)"
                    : " rgba(0, 39, 82,0.8)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TW 2</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Down P. {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Trueway 2
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalMonthlyPayments[1]}
                </p>
              </div>
            </div>
            <div
              className="dashCard"
              onClick={() => {
                setFilterOn("CC");
                setPaginator(0);
              }}
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor:
                  filterOn === "CC"
                    ? " rgba(0, 39, 82,0.6)"
                    : " rgba(0, 39, 82,0.8)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">CC</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Down P. {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Call Center
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalMonthlyPayments[2]}
                </p>
              </div>
            </div>
            <div
              className="dashCard"
              onClick={() => {
                setFilterOn("TOTAL");
                setPaginator(0);
              }}
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor:
                  filterOn === "TOTAL"
                    ? " rgba(0, 39, 82,0.6)"
                    : " rgba(0, 39, 82,0.8)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TOTAL</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Down P. {searchDate || month}
                </p>

                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalMonthlyPayments[2] +
                    totalMonthlyPayments[1] +
                    totalMonthlyPayments[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="dashContCard2">
            <div
              onClick={() => {
                setFilterOn("TW1END");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: " #d8af4d",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TW 1</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Endors. {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Trueway 1
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalEndorsement[0]}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterOn("TW2END");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: " #d8af4d",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TW 2</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Endors. {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Trueway 2
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalEndorsement[1]}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterOn("CCEND");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: " #d8af4d",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">CC</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Endors. {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Call Center
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalEndorsement[2]}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterOn("TOTALEND");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: " #d8af4d",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TOTAL</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Endors. {searchDate || month}
                </p>

                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalEndorsement[2] +
                    totalEndorsement[1] +
                    totalEndorsement[0]}
                </p>
              </div>
            </div>
          </div>
          <div className="dashContCard2">
            <div
              onClick={() => {
                setFilterOn("TW1RENEW");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: "#2ca58d",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TW 1</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Renew {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Trueway 1
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalRenew[0]}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterOn("TW2RENEW");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: "#2ca58d",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TW 2</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Renew {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Trueway 2
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalRenew[1]}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterOn("CCRENEW");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: "#2ca58d",
                marginBottom: "100px",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">CC</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Renew {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Call Center
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalRenew[2]}
                </p>
              </div>
            </div>
            <div
              onClick={() => {
                setFilterOn("TOTALRENEW");
                setPaginator(0);
              }}
              className="dashCard"
              style={{
                marginLeft: "50px",
                cursor: "pointer",
                backgroundColor: "#2ca58d",
                marginBottom: "100px",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <p className="dashCardText">TOTAL</p>
              </div>
              <div className="dashText">
                <p
                  className="dashCardText"
                  style={{
                    color: "#ebeff2",
                    marginBottom: "-5px",
                    marginTop: "-5px",
                  }}
                >
                  Renew {searchDate || month}
                </p>
                <p
                  className="dashCardText"
                  style={{ color: "#ebeff2", marginBottom: "5px" }}
                >
                  Call Center
                </p>
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {totalRenew[2] + totalRenew[1] + totalRenew[0]}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="PaginatorBox">
        <div
          className="PaginatorLeft"
          onClick={() => {
            paginator !== 0 && setPaginator(paginator - 1);
          }}
        >
          <AiOutlineLeft color="white" size={"20px"} />
        </div>
        <div className="PaginatorNum">{paginator + 1}</div>
        <div
          className="PaginatorRight"
          onClick={() => {
            payments.length > 9 && setPaginator(paginator + 1);
          }}
        >
          <AiOutlineRight color="white" size={"20px"} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 0,
          top: "80px",
          width: "20vw",
          minWidth: "500px",
          height: "35px",
          marginLeft: "5vw",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BiSearchAlt2
          size={"20px"}
          style={{ marginLeft: "200px", marginRight: "10px" }}
        />
        <input
          onChange={(e) => {
            setSearch(e.target.value);
            setFilterOn("");
          }}
          style={{
            height: "25px",
            borderColor: "transparent",
            borderRadius: "10px",
            paddingInline: "8px",
            fontFamily: "Poppins",
          }}
          placeholder="Policy Number..."
        ></input>
      </div>
      <img
        src={Isologo_background}
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "428px",
          opacity: "0.5",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default PolicyNumberList;
