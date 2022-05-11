import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../../assets/Icon.png";
import { useSelector } from "react-redux";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const ModifyModal = (props) => {
  const { quoteM, open, onCloseModal } = props;
  const [quote, setQuote] = useState([]);
  const [renew, setRenew] = useState(false);
  const [notes, setNotes] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [bound, setBound] = useState(false);
  const [reInstall, setReInstall] = useState(false);
  const [inputs, setInputs] = useState([]);
  const userId = useSelector((state) => state.UserId);
  const [open1, setOpen1] = useState(false);

  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);
  const checkNotes = () => {
    setBound(false);
    setInputs({ ...inputs, Status:null });
    setCancel(false);
    setReInstall(false);
    setRenew(false);
    setNotes(!notes);
  };
  const checkRenew = () => {
    setBound(false);
    setInputs({ ...inputs, Status: "Renew down" });
    setCancel(false);
    setReInstall(false);
    setRenew(!renew);
    setNotes(false);
  };
  const checkReinstall = () => {
    setBound(false);
    setInputs({ ...inputs, Status: "Re-install" });
    setCancel(false);
    setRenew(false);
    setReInstall(!reInstall);
    setNotes(false);
  };
  const checkBound = () => {
    setRenew(false);
    setInputs({ ...inputs, Status: "Sold" });
    setCancel(false);
    setReInstall(false);
    setBound(!bound);
    setNotes(false);
  };

  const checkCancel = () => {
    setBound(false);
    setInputs({ ...inputs, Status: "Cancelled" });
    setRenew(false);
    setReInstall(false);
    setCancel(!cancel);
    setNotes(false);
  };
  useEffect(() => {
    setInputs({ ...inputs, QuoteId: quoteM.id, UserId: userId });
  }, [props, userId]);
  const submit = () => {
    inputs.Status
      ? fetch(`https://truewayagentbackend.com/modifyQuote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }).then(onOpenModal1())
      : fetch(`https://truewayagentbackend.com/addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }).then(onOpenModal1())
  };

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
                  <p className="REPtype">Sold by</p>
                </th>
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
                  {quoteM.User.name}
                </td>
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
              <div style={{ width: "max-content" }}>
                <div className="MOBmainInput">
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Down amount</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, down: e.target.value });
                      }}
                      placeholder="down"
                      className="MOBinput"
                    ></input>
                  </div>
                  <div className="MOBinputDiv">
                    <p className="MOBinputText">Monthly amount</p>
                    <input
                      onChange={(e) => {
                        setInputs({ ...inputs, monthly: e.target.value });
                      }}
                      placeholder="monthly"
                      className="MOBinput"
                    ></input>
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
        <button className="FITbutton" onClick={submit}>
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

            <button onClick={onCloseModal} className="modalButton">
              Continue
            </button>
          </div>
        </Modal>
      </div>
    </Modal>
  );
};
