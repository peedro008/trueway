import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../Css/css.css";
import { BiSearchAlt2 } from "react-icons/bi";

const PolicyNumberList = ({
  payments,
  paginator,
  setPaginator,
  companies,
  setSearch,
}) => {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Binder</p>
      </div>

      <div style={{ marginBottom: "100px", marginTop: "40px" }}>
        <table className="table2">
          <thead>
            <tr>
              <th scope="col" className="column1">
                <p className="REPtype2">Policy Number</p>
              </th>
              <th scope="col" className="column1">
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
                <p className="REPtype2">Total Premium</p>
              </th>
              <th scope="col" className="column1">
                <p className="REPtype2">Coverage (NSD)</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {payments === 'Nothing' ? 
              <> </>
            : payments
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
                      {
                        companies?.find((f) => f.id === e.Quote?.CompanyId)
                          ?.name
                      }
                    </td>
                    <td scope="row" style={{ fontWeight: "bold" }}>
                      {e.Client?.address || " "}
                    </td>
                    <td scope="row" style={{ fontWeight: "bold" }}>
                      {e.Quote?.totalPremium}
                    </td>
                    <td scope="row" style={{ fontWeight: "bold" }}>
                      {e?.NSDvalue}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
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
          position: "fixed",
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
          onChange={(e) => setSearch(e.target.value)}
          style={{
            height: "25px",
            borderColor: "transparent",
            borderRadius: "10px",
            paddingInline: "8px",
             fontFamily: 'Poppins',
          }}
          placeholder='Policy Number...'
        ></input>
      </div>
    </div>
  );
};

export default PolicyNumberList;
