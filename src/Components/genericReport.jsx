import React from "react";
import { NavLink } from "react-router-dom";
import spinnerr from "../assets/spinnerr.gif";
import { BsChevronLeft, BsInfoCircle } from "react-icons/bs";
import { Checkbox } from "@material-ui/core";
const GenericReportComponent = ({
  items,
  type,
  title,
  producer,
  paymentsFil,
  total,
  setTotal,
  checkCash,
  checkEFT,
  checkCDC,
  cash,
  setCash,
  credit,
  setCredit,
  EFT,
  setEFT,
  checkbox,
  setCheckbox,
  users,
}) => {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">{title}</p>
        <p className="subTitt">{producer ? producer : " "}</p>
      </div>
      {type == "Q" ? (
        <></>
      ) : (
        <div
          className="REPcontrol"
          style={{
            width: "25vw",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Checkbox
              checked={checkbox.Cash}
              onClick={checkCash}
              size="small"
              color="#2b4162"
            />
            <p
              className="genericTitle"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Cash
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <Checkbox
              checked={checkbox.EFT}
              onClick={checkEFT}
              size="small"
              color="#2b4162"
            />
            <p
              className="genericTitle"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              EFT
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {" "}
            <Checkbox
              checked={checkbox.CDC}
              onClick={checkCDC}
              size="small"
              color="#2b4162"
            />
            <p
              className="genericTitle"
              style={{ fontSize: "15px", fontWeight: "600" }}
            >
              Credit/Debit
            </p>
          </div>
        </div>
      )}
      {type == "Q" ? (
        <table class="table1">
          <tbody>
            <tr>
              <th scope="col" className="column1">
                {/* <p className="REPtype">&nbsp;</p> */}
              </th>

              {
                <th scope="col" className="column1">
                  <p className="REPtype">Client name</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Client E-mail</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Client phone</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Category</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Company</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Quoted By</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Sold By</p>
                </th>
              }
              <th scope="col" className="column1">
                <p className="REPtype">Total</p>
              </th>
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Status</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Quoted date</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Closing date</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Time</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Down Payments</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Monthly Payments</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Dealer Name</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">NSD</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">PIP</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">MVR</p>
                </th>
              }
              {
                <th scope="col" className="column1">
                  <p className="REPtype">Location</p>
                </th>
              }
            </tr>
            {!items ? (
              <img
                src={spinnerr}
                style={{
                  width: "200px",
                  position: "absolute",
                  right: "45vw",
                  top: "45vh",
                }}
              />
            ) : (
              items?.map((e) => {
                return (
                  <tr>
                    <td className="ClientName" scope="row">
                      <NavLink
                        style={{ textDecoration: "none", color: "#000" }}
                        to={{
                          pathname: "/report/quote",
                          aboutProps: { ID: e.id },
                        }}
                      >
                        <div className="InfoIcon"></div>
                      </NavLink>
                    </td>
                    {
                      <td className="ClientName" scope="row">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "/report/clientedit",
                            aboutProps: e.Client,
                          }}
                        >
                          {e.Client?.name}
                        </NavLink>
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.Client.email}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.Client.tel}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.Category?.name}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.Company?.name}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.User?.name}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {users.find((f) => f.id == e.SoldBy)?.name}
                      </td>
                    }
                    <td className="row1" scope="row">
                      ${" "}
                      {(
                        (e.down ? parseFloat(e.down) : 0) +
                        (e.PIPvalue ? parseFloat(e.PIPvalue) : 0) +
                        (e.NSDvalue ? parseFloat(e.NSDvalue) : 0) +
                        (e.MVRvalue ? parseFloat(e.MVRvalue) : 0) +
                        (e.creditCardFee ? parseFloat(e.creditCardFee) : 0)
                      ).toFixed(2)}
                    </td>
                    {
                      <td className="row1" scope="row">
                        {
                          e.QuoteStatuses?.sort(function (a, b) {
                            return b.id - a.id;
                          })[0]?.Status
                        }
                      </td>
                    }
                    <td className="row1" scope="row">
                      {e.date}
                    </td>
                    <td className="row1" scope="row">
                      {e.closingDate}
                    </td>
                    <td className="row1" scope="row">
                      {e.time?.substring(11, 16)}
                    </td>
                    {
                      <td className="row1" scope="row">
                        ${e.down}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        ${e.monthlyPayment}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.Dealer ? e.Dealer?.name : "false"}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        ${e.NSDvalue}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        ${e.PIPvalue}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        ${e.MVRvalue}
                      </td>
                    }
                    {
                      <td className="row1" scope="row">
                        {e.Location?.name}
                      </td>
                    }
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      ) : (
        <>
          <table class="table1">
            <tbody>
              <tr>
                <th scope="col" className="column1">
                  <p className="REPtype">&nbsp;</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Client name</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">User name</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Location</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Category</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Type</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Date</p>
                </th>
                {
                  <th scope="col" className="column1">
                    <p className="REPtype">Time</p>
                  </th>
                }
                <th scope="col" className="column1">
                  <p className="REPtype">Amount</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Method</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Fee</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">PIP</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">NSD</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">MVR</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Total</p>
                </th>
              </tr>
              {paymentsFil.map((e) => {
                return (
                  <tr>
                    <td className="ClientName" scope="row">
                      <NavLink
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          textDecoration: "none",
                        }}
                        to={{
                          pathname: "/report/payment/details",
                          aboutProps: e.id,
                        }}
                      >
                        <div className="InfoIcon" />
                      </NavLink>
                    </td>
                    <td className="ClientName" scope="row">
                      {e.Client?.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.User?.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.Location?.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.Category?.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.type}
                    </td>

                    <td className="ClientName" scope="row">
                      {e.date}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.time.substring(11, 16)}
                    </td>
                    <td className="ClientName" scope="row">
                      ${e.amount}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.method}
                    </td>
                    <td className="ClientName" scope="row">
                      ${e.creditCardFee}
                    </td>
                    <td className="ClientName" scope="row">
                      ${e.PIPvalue}
                    </td>
                    <td className="ClientName" scope="row">
                      ${e.NSDvalue ? Number(e.NSDvalue).toFixed(2) : 0}
                    </td>

                    <td className="ClientName" scope="row">
                      ${e.MVRvalue}
                    </td>
                    <td className="ClientName" scope="row">
                      $
                      {(
                        (e.amount ? parseFloat(e.amount) : 0) +
                        (e.PIPvalue ? parseFloat(e.PIPvalue) : 0) +
                        (e.NSDvalue ? parseFloat(e.NSDvalue) : 0) +
                        (e.MVRvalue ? parseFloat(e.MVRvalue) : 0) +
                        (e.creditCardFee ? parseFloat(e.creditCardFee) : 0)
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="DAItotalCont">
            <div className="DAItotal">
              <p className="DEPtotalT">TOTAL CASH $ {cash.toFixed(2)}</p>
            </div>
            <div className="DAItotal">
              <p className="DEPtotalT">TOTAL EFT $ {EFT.toFixed(2)}</p>
            </div>
            <div className="DAItotal">
              <p className="DEPtotalT">
                TOTAL CREDIT CARD $ {credit.toFixed(2)}
              </p>
            </div>
          </div>
        </>
      )}
      <BsChevronLeft
        color="grey"
        cursor="pointer"
        style={{
          minWidth: "30px",
          minHeight: "30px",
          position: "fixed",
          zIndex: 9,
          left: "80px",
          top: "17px",
          alignSelf: "flex-start",
        }}
        onClick={() => window.history.go(-1)}
      />
    </div>
  );
};

export default GenericReportComponent;
