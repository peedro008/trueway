import React from "react";
import { BiPencil } from "react-icons/bi";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { NavLink } from "react-router-dom";
import { Controller } from "react-hook-form";

import Select from "react-select";
import { BsInfoCircle } from "react-icons/bs";
const ModifyModalComponent = ({
  quoteM,
  quote,
  renew,
  notes,
  cancel,
  bound,
  reInstall,
  inputs,
  setQuote,
  setRenew,
  setNotes,
  setCancel,
  setBound,
  setReInstall,
  setInputs,
  useSelector,
  setOpen1,
  open1,
  open,
  onCloseModal,
  onOpenModal1,
  onCloseModal1,
  checkNotes,
  checkRenew,
  checkReinstall,
  checkBound,
  checkCancel,
  optionsCo,
  reload,
  submit,
  paginator,
}) => {
  console.log(quoteM);
  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      classNames={{ modal: "modifyModal" }}
    >
      <div>
        <div className="genericHeader">
          <p className="genericTitle">Modify quote</p>

          <div style={{ width: "150px", display: "flex" }}>
            <NavLink
              style={{ width: "25px", marginTop: "2px" }}
              to={{
                pathname: "/report/quote",
                aboutProps: { ID: quoteM.id, paginator: paginator },
              }}
            >
              <div className="InfoIcon2">
                <BsInfoCircle size={"25px"} color={"#54B4D3"} />
              </div>
            </NavLink>
            <p className="genericSubTitle1" style={{ marginLeft: "10px" }}>
              Quote # {quoteM.id}{" "}
            </p>
          </div>
        </div>

        {!quoteM ? (
          <div></div>
        ) : (
          <table class="table4">
            <tbody>
              <tr>
                <th scope="col" className="column1">
                  <p className="REPtype2">Client name</p>
                </th>

                <th scope="col" className="column1">
                  <p className="REPtype2">Client phone</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Company</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Monthly Payments</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Down Payments</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Date</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Time</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Quoted by</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype2">Status</p>
                </th>

                {quoteM.QuoteStatuses[0].Status == "Sold" && (
                  <>
                    <th scope="col" className="column1">
                      <p className="REPtype2">Sold date</p>
                    </th>
                    <th scope="col" className="column1">
                      <p className="REPtype2">Sold by</p>
                    </th>
                  </>
                )}
              </tr>

              <tr>
                <td className="ClientName" scope="row">
                  {quoteM.Client.name}
                </td>

                <td className="row1" scope="row">
                  {quoteM.Client.tel}
                </td>
                <td className="row1" scope="row">
                  {quoteM.Company.name}
                </td>
                <td className="row1" scope="row">
                  {quoteM.monthlyPayment}
                </td>
                <td className="row1" scope="row">
                  {quoteM.down}
                </td>
                <td className="row1" scope="row">
                  {quoteM.date}
                </td>
                <td className="row1" scope="row">
                  {parseInt(quoteM.time.substring(11, 13)) - 5}
                  {quoteM.time.substring(16, 19)}
                </td>
                <td className="row1" scope="row">
                  {quoteM.User.name}
                </td>
                <td className="row1" scope="row">
                  {quoteM.QuoteStatuses[0].Status}
                </td>
                {quoteM.QuoteStatuses[0].Status == "Sold" && (
                  <>
                    <td className="row1" scope="row">
                      {quoteM.QuoteStatuses[0].date}
                    </td>
                    <td className="row1" scope="row">
                      {quoteM.QuoteStatuses[0].User.name}
                    </td>
                  </>
                )}
              </tr>
            </tbody>
          </table>
        )}

        <div className="MOBbox1">
          <div className="MOBsBox">
            <p className="MOBtitle" style={{ color: "#777DA7" }}>
              Add Note
            </p>
            <input
              class="checkbox"
              style={{
                display: "flex",
                marginRight: "15px",
                marginTop: "15px",
              }}
              type="checkbox"
              key="Cancelation"
              name="Cancelation"
              checked={notes}
              onChange={checkNotes}
            />
          </div>

          <div className="MOBsBox" style={{ width: "max-content" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="MOBsBox">
                <p className="MOBtitle" style={{ color: "#28C76F" }}>
                  Renew down
                </p>
                <input
                  class="checkbox"
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    marginTop: "15px",
                  }}
                  type="checkbox"
                  key="Renew"
                  name="Renew"
                  checked={renew}
                  onChange={checkRenew}
                />
              </div>

              <div className="MOBsBox">
                <p className="MOBtitle" style={{ color: "#28C76F" }}>
                  Bound
                </p>
                <input
                  class="checkbox"
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    marginTop: "15px",
                  }}
                  type="checkbox"
                  key="Bound"
                  name="Bound"
                  checked={bound}
                  onChange={checkBound}
                />
              </div>
              <div className="MOBsBox">
                <p className="MOBtitle" style={{ color: "#28C76F" }}>
                  Re-install
                </p>
                <input
                  class="checkbox"
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    marginTop: "15px",
                  }}
                  type="checkbox"
                  key="Bound"
                  name="Bound"
                  checked={reInstall}
                  onChange={checkReinstall}
                />
              </div>
              <div className="MOBsBox">
                <p className="MOBtitle" style={{ color: "#FF4C61" }}>
                  Cancelation
                </p>
                <input
                  class="checkbox"
                  style={{
                    display: "flex",
                    marginRight: "15px",
                    marginTop: "15px",
                  }}
                  type="checkbox"
                  key="Cancelation"
                  name="Cancelation"
                  checked={cancel}
                  onChange={checkCancel}
                />
              </div>
            </div>

            {(renew || bound || reInstall) && (
              <>
                <div className="MOBmainInput2">
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Down payment</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, down: e.target.value });
                      }}
                      placeholder="Down"
                      className="AQinput"
                    ></input>
                  </div>
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Monthly payment</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, monthly: e.target.value });
                      }}
                      placeholder="Monthly"
                      className="AQinput"
                    ></input>
                  </div>
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Company</p>

                    <Select
                      onChange={(val) =>
                        setInputs({ ...inputs, CompanyId: val.value })
                      }
                      options={optionsCo}
                      className="PAYselect"
                      placeholder="Select Company"
                    />
                  </div>
                  <div
                    className="MOBinputDiv"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "start",
                    }}
                  >
                    <p className="MOBinputText">Payment Date (optional)</p>
                    <input
                      type={"date"}
                      className="AQinput"
                      onChange={(val) =>
                        setInputs({ ...inputs, date: val.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="MOBmainInput2">
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Effective Date</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, effectiveDate: e.target.value });
                      }}
                      defaultValue={quoteM?.effectiveDate}
                      type="date"
                      className="AQinput"
                    ></input>
                  </div>
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Expiration Date</p>
                    <input
                      onChange={(e) => {
                        setInputs({
                          ...inputs,
                          expirationDate: e.target.value,
                        });
                      }}
                      defaultValue={quoteM?.expirationDate}
                      type="date"
                      className="AQinput"
                    ></input>
                  </div>
                  <div className="MOBinputDiv">
                    <p
                      className="MOBinputText"
                      style={{ width: "500px", fontSize: "15px" }}
                    >
                      Policy number for New Policies, Endorsments, Renewals
                      ONLY.
                    </p>

                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, policyNumber: e.target.value });
                      }}
                      defaultValue={quoteM?.policyNumber}
                      placeholder="Policy number..."
                      className="AQinput"
                    ></input>
                  </div>
                </div>
              </>
            )}
            {(renew || bound || cancel || reInstall || notes) && (
              <div className="MOBinputDiv" style={{ marginLeft: "-200px" }}>
                <p className="MOBinputText">Notes</p>
                <textarea
                  onChange={(e) => {
                    setInputs({ ...inputs, note: e.target.value });
                  }}
                  placeholder="Type notes..."
                  className="MOBtexta1"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="FITbutton"
          onClick={submit}
          style={{ marginTop: "-30px" }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <BiPencil
              size="20px"
              style={{
                display: "flex",
                color: "#2B4162",
                marginLeft: "8px",
                marginTop: "1px",
              }}
            />
            <p className="FITbuttonText">Submit</p>
          </div>
        </button>
        <Modal open={open1} onClose={onCloseModal1} center classNames={"modal"}>
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

            <p className="modalText">Quote modified successfully</p>

            <button onClick={reload} className="modalButton">
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};

export default ModifyModalComponent;
