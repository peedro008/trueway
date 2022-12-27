import React from "react";
import { NavLink } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { BiPencil, BiDotsHorizontalRounded } from "react-icons/bi";

import { useSelector } from "react-redux";
import ProducerSales from "../Charts/ProducerSales";

import ProducerPie from "../Charts/ProducerPie";
const ManagerDetailsComponent = ({
  LmNSD,
  quotes,
  setQuotes,
  lmquotes,
  payments,
  setPayments,
  mquotes,
  setMquotes,
  modify,
  setModify,
  mstat,
  setMstat,
  yquotes,
  setYquotes,
  mpay,
  setMpay,
  ypay,
  setYpay,
  ystat,
  lmstat,
  setYstat,
  dots1,
  setDots1,
  dots2,
  setDots2,
  dots3,
  setDots3,
  dots1V,
  setDots1V,
  dots2V,
  setDots2V,
  dots3V,
  setDots3V,
  NSD,
  setNSD,
  yNSD,
  setYNSD,
  Producer,
  google,
}) => {
  const userRole = useSelector((state) => state.userRole);

  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">{Producer?.name}</p>
      </div>
      <div className="PRODcont1">
        <div className="PRODrect">
          <div className="PRODrectH">
            <div className="container1111">
              <p className="PRODrectT" style={{ flexDirection: "column" }}>
                Sold Quotes
              </p>
             
                <p className="PRODRECTheader">This Year</p>
              
            </div>
            
          </div>
          <div className="PRODrectB">
            <div style={{ display: "flex", flexDirection: "row" }}>
            
                <p className="PRODrectQ">
                  {
                    yquotes?.sold
                  }
                  &nbsp;
                </p>
              

              <p className="PRODrectQ">Sold</p>
            </div>
            <div className="PRODrectP"></div>
          </div>
        </div>
        <div className="PRODrect">
          <div className="PRODrectH">
            <div className="container1111">
              <p className="PRODrectT" style={{ flexDirection: "column" }}>
                Unsold Quotes
              </p>
             
                <p className="PRODRECTheader">This Year</p>
              
            </div>
          
          </div>
          <div className="PRODrectB">
            <div style={{ display: "flex", flexDirection: "row" }}>
              
                <p className="PRODrectQ">
                  {yquotes.unsold}
                  &nbsp;
                </p>
              
              <p className="PRODrectQ">Quotes</p>
            </div>

            <div className="PRODrectP"></div>
          </div>
        </div>
       
        <div className="PRODrect">
          <div className="PRODrectH">
            <div className="container1111">
              <p className="PRODrectT" style={{ flexDirection: "column" }}>
                NSD commission
              </p>
                <p className="PRODRECTheader">This Year</p>
            </div>
          
          </div>
          <div className="PRODrectB">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <p className="PRODrectQ">$&nbsp;{yNSD} </p>
            </div>
            <div className="PRODrectP"></div>
          </div>
        </div>
       
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {google && (
          <>
            <ProducerSales aboutProps={Producer.UserId} google={google} />
            {/* <ProducerPie aboutProps={Producer.UserId} google={google} /> */}
          </>
        )}
      </div>
      {userRole !== "Producer" && (
        <NavLink
          to={{
            pathname: "/users/producers/edit",
            props: Producer,
          }}
        >
          <button className="FITbutton">
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
              <p className="FITbuttonText">Edit</p>
            </div>
          </button>
        </NavLink>
      )}
      <BsChevronLeft
        cursor="pointer"
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
};
export default ManagerDetailsComponent;