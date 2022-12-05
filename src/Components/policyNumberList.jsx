import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import "../Css/css.css";

const PolicyNumberList = ({ payments }) => {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Policy List</p>
      </div>

      <div style={{ paddingLeft: "60px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <p className="tableTitle">Policy Number</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Date</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Company</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Sold By</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((e) => {
              return (
                <tr>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.policyNumber || ""}
                  </td>

                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.date}
                  </td>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.Client.name}
                  </td>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.User.name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PolicyNumberList;
