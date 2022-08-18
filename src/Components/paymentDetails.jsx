import { BiPencil } from "react-icons/bi";
import React from "react";
import { NavLink } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import spinnerr from "../assets/spinnerr.gif"

function PaymentDetailsComponent({ payment, id }) {
  return (
    <div className="genericDiv" style={{ overflowX: "hidden" }}>
      {!payment?.length ? (
       <img src={spinnerr} style={{width:"200px", position:"absolute", right:"45vw", top:"45vh"}}/>
      ) : (
        <div>
          <div className="genericHeader">
            <p className="genericTitle">Payment #{id}</p>
            <p className="subTitt">{payment&&payment[0].date}</p>
          </div>
          <div className="PAYDbigconta">
            <div className="PAYDtitlebox">
              <p className="PAYDtitle">Customer Information</p>
            </div>
            <div className="PAYDconta">
              <div className="DETsBox">
                <p className="DETtitle">Client name</p>
                <p className="DETtext">{payment&&payment[0].Client.name}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Email</p>
                <p className="DETtext">{payment&&payment[0].Client.email}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Phone</p>
                <p className="DETtext">{payment&&payment[0].Client.tel}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Address</p>
                <p className="DETtext">{payment&&payment[0].Client.address}</p>
              </div>
            </div>
            <div className="PAYDtitlebox">
              <p className="PAYDtitle">Policy Information</p>
            </div>
            <div className="PAYDconta">
              <div className="DETsBox">
                <p className="DETtitle">Category</p>
                <p className="DETtext">{payment[0].Category?.name}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Company</p>
                <p className="DETtext">{payment&&payment[0].Quote?.Company?.name}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Expedition Date</p>
                <p className="DETtext">{payment&&payment[0].date}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Payment Type</p>
                <p className="DETtext">{payment&&payment[0].type}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Office</p>
                <p className="DETtext">{payment&&payment[0].Location.name}</p>
              </div>
            </div>
            <div className="PAYDtitlebox">
              <p className="PAYDtitle">Payment Information</p>
            </div>
            <div className="PAYDconta">
              <div className="DETsBox">
                <p className="DETtitle">Total Amount</p>
                <p className="DETtext">  $
                    {parseFloat(payment[0].amount) +
                      parseFloat(payment[0].PIPvalue) +
                      parseFloat(payment[0].NSDvalue) +
                      parseFloat(payment[0].MVRvalue) +
                      parseFloat(payment[0].creditCardFee)}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">Payment Method</p>
                <p className="DETtext">{payment&&payment[0].method}</p>
              </div>
              <div className="PAYDsCont">
              <div className="DETsBox">
                <p className="DETtitle">NSD</p>
                <p className="DETtext">${payment&&payment[0].NSDvalue}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">PIP</p>
                <p className="DETtext">${payment&&payment[0].PIPvalue}</p>
              </div>
              <div className="DETsBox">
                <p className="DETtitle">MVR</p>
                <p className="DETtext">${payment&&payment[0].MVRvalue}</p>
              </div>
              </div>
             
            </div>
          </div>
        </div>
      )}

             
<BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>
    </div>
  );
}

export default PaymentDetailsComponent;
