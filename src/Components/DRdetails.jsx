import { Checkbox } from "@material-ui/core";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../PDF/daily";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";


function DRdetailsComponent({
    payments,
    paymentsFil,
    cash,
    credit,
    EFT,
    producers,
    search,
    date,
    total,
    checkbox,
    setPayments,
    setPaymentsFil,
    setCash,
    setCredit,
    setEFT,
    setProducers,
    setSearch,
    setDate,
    setTotal,
    setCheckbox,
    UserId,
    LocationId,
    checkCash,
    checkEFT,
    checkCDC,
}) {
 
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Daily report</p>
      </div>
      <div className="REPcontrol" style={{width:"25vw", display:"flex", justifyContent:"space-between"}}>
      <div style={{display:"flex", flexDirection:"row"}}><Checkbox value={checkbox.Cash} onClick={checkCash}  size="small"  color="#2b4162"/><p className="genericTitle" style={{fontSize:"15px", fontWeight:"600" }}>Cash</p></div>
      <div style={{display:"flex", flexDirection:"row"}}>   <Checkbox value={checkbox.EFT} onClick={checkEFT}   size="small"  color="#2b4162"/><p className="genericTitle" style={{fontSize:"15px", fontWeight:"600" }}>EFT</p></div>
      <div style={{display:"flex", flexDirection:"row"}}>    <Checkbox value={checkbox.CDC}  onClick={checkCDC}   size="small" color="#2b4162"/><p className="genericTitle" style={{fontSize:"15px", fontWeight:"600" }}>Credit/Debit</p></div>
      </div>
      <table className="table2">
        <tbody>
          <tr>
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
              <p className="REPtype">Type</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Date</p>
            </th>
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
          {!search
            ? paymentsFil.map((e) => {
                return (
                  <tr>
                    <td className="ClientName" scope="row">
                      {e.Client.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.User.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.Location.name}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.type}
                    </td>
                    <td className="ClientName" scope="row">
                      {e.date}
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
                      ${e.NSDvalue}
                    </td>
                    <td className="ClientName" scope="row">
                      ${e.MVRvalue}
                    </td>
                    <td className="ClientName" scope="row">
                      $
                      {parseFloat(e.amount) +
                        parseFloat(e.PIPvalue) +
                        parseFloat(e.NSDvalue) +
                        parseFloat(e.MVRvalue) +
                        parseFloat(e.creditCardFee)}
                    </td>
                  </tr>
                );
              })
            : paymentsFil
                .filter((e) =>
                  e.Client.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((e) => {
                  return (
                    <tr>
                      <td className="ClientName" scope="row">
                        {e.Client.name}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.User.name}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.Location.name}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.type}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.date}
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
                        ${e.NSDvalue}
                      </td>
                      <td className="ClientName" scope="row">
                        ${e.MVRvalue}
                      </td>
                      <td className="ClientName" scope="row">
                        $
                        {(parseFloat(e.amount) +
                          parseFloat(e.PIPvalue) +
                          parseFloat(e.NSDvalue) +
                          parseFloat(e.MVRvalue) +
                          parseFloat(e.creditCardFee)).toFixed(2)}
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
          <p className="DEPtotalT">TOTAL CREDIT CARD $ {credit.toFixed(2)}</p>
        </div>
      </div>

      <PDFDownloadLink
        style={{ textDecoration: "none", color: "black" }}
        document={
          <MyDocument
            data={{ payments: paymentsFil, producers: producers, date: date }}
          />
        }
        fileName="DailyCloseout"
      >
        <div
          style={{
            position: "absolute",
            right: "50px",
            top: "76px",
            display: "flex",
          }}
        >
          <button className="PAYbutton">
            <p className="PAYbuttonText">Generate PDF</p>
          </button>
        </div>
      </PDFDownloadLink>
      <BsChevronLeft
        color="grey"
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
}

export default DRdetailsComponent;
