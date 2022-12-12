import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../Css/css.css";

const PolicyNumberList = ({ payments, paginator,
  setPaginator }) => {
  console.log(payments.length)

  const [disabled, setDisabled] = useState();
 
  useEffect(() => {

      
      payments.length < 9 ? setDisabled() : setDisabled({ pointerEvents: "none", opacity: "0.5" });


  }, [paginator]);

  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Bainder 2</p>
      </div>

      <div style={{ paddingLeft: "60px", marginBottom: '100px' }}>
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
                <p className="tableTitle">Time</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Company</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Company Address</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Expiration Date</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Coverage (NSD)</p>
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
                    {e.time.slice(11,16)}
                  </td>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.Client.name}
                  </td>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.Client.address}
                  </td>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {/* {e.User.name} */}
                  </td>
                  <td scope="row" style={{ fontWeight: "bold" }}>
                    {e.NSDvalue}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="PaginatorBox">
            <div className="PaginatorLeft"  onClick={()=>{paginator === 1 && setPaginator(paginator-1);      setDisabled(); }}>
                <AiOutlineLeft  color="#858585" size={"20px"}/>
            </div>
            <div className="PaginatorNum">{paginator + 1}</div>
            <div  className="PaginatorRight"
        style={disabled} onClick={()=>{payments.length>9 && setPaginator(paginator+1)}}>
                <AiOutlineRight color="#858585" size={"20px"}/>
            </div>
      </div>
    </div>
  );
};

export default PolicyNumberList;
