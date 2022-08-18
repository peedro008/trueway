import React from "react";
import { NavLink } from "react-router-dom";

import { BsChevronLeft } from "react-icons/bs";
import { BiPencil, BiDotsHorizontalRounded } from "react-icons/bi";

import ProducerSales from "../Charts/ProducerSales";

import ProducerPie from "../Charts/ProducerPie";
import { useSelector } from "react-redux";
const ProducerDetailsComponent = ({
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
            <p className="PRODrectT" style={{flexDirection:"column"}}>Sold Quotes</p>
            {dots1V == 1 ? <p className="PRODRECTheader">This Month</p>:dots1V == 2 ?<p className="PRODRECTheader">Last Month</p>:<p className="PRODRECTheader">This Year</p>}</div>
            <BiDotsHorizontalRounded
              style={{ cursor: "pointer" }}
              size={30}
              color={"#979797"}
              onClick={() => setDots1(!dots1)}
            />
          </div>
          <div className="PRODrectB">
            <div style={{ display: "flex", flexDirection: "row" }}>
              
              {dots1V == 1 ? (
          
                <p className="PRODrectQ">
                  
                  {mquotes.filter((e) => e.QuoteStatuses.sort(function (a, b) {
                          return b.id - a.id;
                        })[0].Status == "Sold")?.length
                    }
                  &nbsp;{" "}
                </p>
              ) : dots1V == 2? (
                
                <p className="PRODrectQ">
                  {lmquotes.filter((e) => e.QuoteStatuses.sort(function (a, b) {
                          return b.id - a.id;
                        })[0].Status == "Sold")?.length}
                  &nbsp;
                </p>
              )
              : (
                
                <p className="PRODrectQ">
                  {yquotes.filter((e) => e.QuoteStatuses.sort(function (a, b) {
                          return b.id - a.id;
                        })[0].Status == "Sold")?.length}
                  &nbsp;
                </p>
              )}
              
              <p className="PRODrectQ">Sold</p>
            </div>
            <div className="PRODrectP"></div>
          </div>
        </div>
        {dots1 && (
          <div className="PRODdotsCont1">
          
            <p
              className="PRODdotT"
              style={{ color: dots1V == 0 ? "black" : "#979797" }}
              onClick={() => {
                setDots1V(0);
                setDots1(!dots1);
              }}
            >
              This year
            </p>
            <p
              className="PRODdotT"
              style={{ color: dots1V == 1 ? "black" : "#979797" }}
              onClick={() => {
                setDots1V(1);
                setDots1(!dots1);
              }}
            >
              This month
            </p>
            <p
              className="PRODdotT"
              style={{ color: dots1V == 2 ? "black" : "#979797" }}
              onClick={() => {
                setDots1V(2);
                setDots1(!dots1);
              }}
            >
              Last month
            </p>
          </div>
        )}
        <div className="PRODrect">
          <div className="PRODrectH">
          <div className="container1111">
            <p className="PRODrectT" style={{flexDirection:"column"}}>Unsold Quotes</p>
            {dots2V == 1 ? <p className="PRODRECTheader">This Month</p>:dots2V == 2 ?<p className="PRODRECTheader">Last Month</p>:<p className="PRODRECTheader">This Year</p>}</div>
            <BiDotsHorizontalRounded
              style={{ cursor: "pointer" }}
              size={30}
              color={"#979797"}
              onClick={() => setDots2(!dots2)}
            />
          </div>
          <div className="PRODrectB">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {dots2V == 1 ? (
                <p className="PRODrectQ">
                  {mquotes.filter(
                    (e) =>
                      e.QuoteStatuses.sort(function (a, b) {
                        return b.id - a.id;
                      })[0].Status == "Quoted"
                  ).length
                    ? mquotes.filter(
                        (e) =>
                          e.QuoteStatuses.sort(function (a, b) {
                            return b.id - a.id;
                          })[0].Status == "Quoted"
                      ).length
                    : 0}
                  &nbsp;
                </p>
              ): dots2V == 2 ?(
                <p className="PRODrectQ">
                  {lmquotes.filter(
                    (e) =>
                      e.QuoteStatuses.sort(function (a, b) {
                        return b.id - a.id;
                      })[0].Status == "Quoted"
                  ).length
                    ? yquotes.filter(
                        (e) =>
                          e.QuoteStatuses.sort(function (a, b) {
                            return b.id - a.id;
                          })[0].Status == "Quoted"
                      ).length
                    : 0}
                  &nbsp;
                </p>
              ) : (
                <p className="PRODrectQ">
                  {yquotes.filter(
                    (e) =>
                      e.QuoteStatuses.sort(function (a, b) {
                        return b.id - a.id;
                      })[0].Status == "Quoted"
                  ).length
                    ? yquotes.filter(
                        (e) =>
                          e.QuoteStatuses.sort(function (a, b) {
                            return b.id - a.id;
                          })[0].Status == "Quoted"
                      ).length
                    : 0}
                  &nbsp;
                </p>
              )}
              <p className="PRODrectQ">Quotes</p>
            </div>

            <div className="PRODrectP"></div>
          </div>
        </div>
        {dots2 && (
          <div className="PRODdotsCont2">
            <p
              className="PRODdotT"
              style={{ color: dots2V == 0 ? "black" : "#979797" }}
              onClick={() => {
                setDots2V(0);
                setDots2(!dots2);
              }}
            >
              This year
            </p>
            <p
              className="PRODdotT"
              style={{ color: dots2V == 1 ? "black" : "#979797" }}
              onClick={() => {
                setDots2V(1);
                setDots2(!dots2);
              }}
            >
              This month
            </p>
            <p
              className="PRODdotT"
              style={{ color: dots2V == 2 ? "black" : "#979797" }}
              onClick={() => {
                setDots2V(2);
                setDots2(!dots2);
              }}
            >
              Last month
            </p>
          </div>
        )}
        <div className="PRODrect">
          <div className="PRODrectH">
          <div className="container1111">
            <p className="PRODrectT" style={{flexDirection:"column"}}>NSD commission</p>
            
            {dots3V == 1 ? <p className="PRODRECTheader">This Month</p>:dots3V == 2 ?<p className="PRODRECTheader">Last Month</p>:<p className="PRODRECTheader">This Year</p>}</div>
            <BiDotsHorizontalRounded
              style={{ cursor: "pointer" }}
              size={30}
              color={"#979797"}
              onClick={() => setDots3(!dots3)}
            />
          </div>
          <div className="PRODrectB">
            <div style={{ display: "flex", flexDirection: "row" }}>
              {dots3V == 1 ? (
                <p className="PRODrectQ">$&nbsp;{NSD ? NSD : 0} </p>
              ) : dots3V==2? (
                <p className="PRODrectQ">$&nbsp;{LmNSD} </p>
              )
            :
            <p className="PRODrectQ">$&nbsp;{yNSD} </p>
            }
            </div>
            <div className="PRODrectP"></div>
          </div>
        </div>
        {dots3 && (
          <div className="PRODdotsCont3">
            <p
              className="PRODdotT"
              style={{ color: dots3V == 0 ? "black" : "#979797" }}
              onClick={() => {
                setDots3V(0);
                setDots3(!dots3);
              }}
            >
              This year
            </p>
            <p
              className="PRODdotT"
              style={{ color: dots3V == 1 ? "black" : "#979797" }}
              onClick={() => {
                setDots3V(1);
                setDots3(!dots3);
              }}
            >
              This month
            </p>
            <p
              className="PRODdotT"
              style={{ color: dots3V == 2 ? "black" : "#979797" }}
              onClick={() => {
                setDots3V(2);
                setDots3(!dots3);
              }}
            >
              Last month
            </p>
          </div>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {google && (
          <>
            {" "}
            <ProducerSales aboutProps={Producer.UserId} google={google} />
            <ProducerPie aboutProps={Producer.UserId} google={google} />
          </>
        )}
      </div>
      {userRole !== "Producer" && 
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
      </NavLink>}      <BsChevronLeft
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
export default ProducerDetailsComponent;
