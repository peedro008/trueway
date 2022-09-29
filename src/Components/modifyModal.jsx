import React from "react";
import { BiPencil } from "react-icons/bi";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { Controller } from "react-hook-form";

import Select from "react-select";
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
    submit,}) => {
  
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
          <p className="genericSubTitle1">Quote # {quoteM.id} </p>
        </div>

        {!quoteM ? (
          <div></div>
        ) : (
          <table class="table4">
            <tbody>
              <tr>
                <th scope="col" className="column1">
                  <p className="REPtype">Client name</p>
                </th>

                <th scope="col" className="column1">
                  <p className="REPtype">Client phone</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Company</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Monthly Payments</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Down Payments</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Date</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Time</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Quoted by</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Status</p>
                </th>
                
                {
                  quoteM.QuoteStatuses[0].Status=="Sold"
                &&<>
                <th scope="col" className="column1">
                  <p className="REPtype">Sold date</p>
                </th>
                <th scope="col" className="column1">
                  <p className="REPtype">Sold by</p>
                </th></>}
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
                {
                  quoteM.QuoteStatuses[0].Status=="Sold"
                &&<>
                <td className="row1" scope="row">
                  {quoteM.QuoteStatuses[0].date}
                </td>
                <td className="row1" scope="row">
                  {quoteM.QuoteStatuses[0].User.name}
                </td></>}
              </tr>
            </tbody>
          </table>
        )}

        <div className="MOBbox1">
        <div className="MOBsBox" >
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
              <div style={{  }}>
                <div className="MOBmainInput">
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Down amount</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, down: e.target.value });
                      }}
                      placeholder="down"
                      className="AQinput"
                    ></input>
                  </div>
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Monthly amount</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, monthly: e.target.value });
                      }}
                      placeholder="monthly"
                      className="AQinput"
                    ></input>
                  </div>
                  </div>
                  <div className="MOBmainInput">
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Company</p>
                    
                  <Select
                    
                    onChange={(val) => setInputs({ ...inputs,CompanyId:val.value})}
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
              <p className="MOBinputText">Date?</p>
              <input
              type={"date"}
                className="AQinput"
             
              
                onChange={(val) => setInputs({ ...inputs,date:val.target.value})}
              />
             
            </div>
              
                </div>
              </div>
            )}
            {(renew || bound || cancel || reInstall || notes) && (
              <div className="MOBinputDiv">
                <p className="MOBinputText">Notes</p>
                <textarea
                  onChange={(e) => {
                    setInputs({ ...inputs, note: e.target.value });
                  }}
                  className="MOBtexta1"
                />
              </div>
            )}
          </div>

          {/* <div className='MOBsBox'>
                 <p className='MOBtitle' style={{color:"#28C76F"}}>Bound</p>
                 <input class="checkbox" style={{display:"flex", marginRight:"15px",marginTop:"15px", }} type="checkbox" key="Bound" name="Bound" checked={bound} onChange={checkBound}/>
               
            </div>
            <div className='MOBsBox'>
                 <p className='MOBtitle' style={{color:"#28C76F"}}>Re-install</p>
                 <input class="checkbox" style={{display:"flex", marginRight:"15px",marginTop:"15px", }} type="checkbox" key="Bound" name="Bound" checked={reInstall} onChange={checkReinstall}/>
               
            </div>
            <div className='MOBsBox'>
                 <p className='MOBtitle' style={{color:"#FF4C61"}}>Cancelation</p>
                 <input class="checkbox" style={{display:"flex", marginRight:"15px",marginTop:"15px", }} type="checkbox" key="Cancelation" name="Cancelation" checked={cancel} onChange={checkCancel}/>
                
              
            </div> */}
        </div>
        <button className="FITbutton" onClick={submit} style={{marginTop:"-30px"}}>
          <div style={{ display: "flex", flexDirection: "row", }}>
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

            <button onClick={onCloseModal} className="modalButton">
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};

export default ModifyModalComponent