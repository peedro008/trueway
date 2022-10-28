import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import Modal from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { NavLink } from "react-router-dom";
import SearchField from "react-search-field";

function DailyReportComponent({
  onSubmit,
  payments,
  cash,
  credit,
  EFT,
  search,
  yPayments,
  setYPayments,
  setSearch,
  open,
  setOpen,
  yesterday,
  setYesterday,
  onOpenModal,
  onCloseModal,
}) {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Daily report</p>
      </div>
      <div
        className="REPcontrol"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "80vw",
          justifyContent: "space-between",
        }}
      >
        <div className="DAIsearch1">
          <SearchField placeholder="Search by client" onChange={setSearch} />
        </div>

        {yPayments.length && !yesterday ? (
          <div className="DRyesterday" onClick={() => setYesterday(!yesterday)}>
            <p className="DRyesterdayT">Yesterday's daily report.</p>
          </div>
        ) : (
          <></>
        )}
        {yesterday ? (
          <div className="DRyesterday" style={{  border: "1px solid #33D69F"}} onClick={() => setYesterday(!yesterday)}>
            <p className="DRyesterdayT" style={{color:"#33D69F"}}>Today's report.</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <table className="table2" style={{ width: "80vw" }}>
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
          {!search
            ? (yesterday ? yPayments : payments)
                .sort(function (a, b) {
                  return b.id - a.id;
                })
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
            : (yesterday ? yPayments : payments)
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
                })}
        </tbody>
      </table>

      <div className="DAItotalCont">
        <div className="DAItotal">
          <p className="DEPtotalT">TOTAL CASH $ {cash}</p>
        </div>
        <div className="DAItotal">
          <p className="DEPtotalT">TOTAL EFT $ {EFT}</p>
        </div>
        <div className="DAItotal">
          <p className="DEPtotalT">TOTAL CREDIT CARD $ {credit}</p>
        </div>
      </div>

      {/* <PDFDownloadLink style={{textDecoration:"none", color:"black"}} document={<MyDocument data={{payments:payments, producers:producers, date: date}} />}fileName="DailyCloseout">
       */}
      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <button onClick={onSubmit} className="PAYbutton" style={{backgroundColor:(cash==0&&EFT==0&&credit==0)?"#e5e5e5":"#2B4162"}} disabled={(cash==0&&EFT==0&&credit==0)?true:false}>

          <p className="PAYbuttonText">Generate</p>
        </button>
      </div>
      {/* </PDFDownloadLink> */}
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

      <Modal open={open} onClose={onCloseModal} center>
        <div className="modal">
          <img
            src={Icon}
            style={{
              width: "35px",
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />

          <p className="modalText">¡Successfull!</p>

          <button className="modalButton">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "#000" }}
              to={"/Management"}
            >
              Continue
            </NavLink>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DailyReportComponent;
