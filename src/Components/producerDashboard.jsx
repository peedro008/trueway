import React from "react";
import error from "../assets/error.png";
import wbill from "../assets/wbill.png";
import bbill from "../assets/bbill.png";
import mask from "../assets/mask.png";
import { NavLink } from "react-router-dom";

const ProducerDashboardComponent = ({
  NSD,
  setNSD,
  asd,
  setAsd,
  pquotes,
  setPquotes,
  uQuotes,
  setUQuotes,
  sQuotes,
  setSQuotes,
  dataList,
  setDataList,
  status,
  setStatus,
  payments,
  setPayments,
  dispatch,
  google,
  producers,
  UserId,
  modify,
  quotes2,
  userId,
  companies,
  avg
}) => {
  // console.log(quotes2)
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Dashboard</p>
      </div>

      <div className="DashContainer">
        <div className="DashSubCont1">
          <div className="DashStatusCont1">
            <div className="DashStatusHeader">
              <p className="DashPListTitle">Unsold Quotes This Month</p>
            </div>
            <div className="DashStatusColumns">
              <p className="dashListTitle">Client Name</p>
              <p className="dashListTitle">Company</p>
              <p className="dashListTitle">Monthly Paym.</p>
              <p className="dashListTitle">Down</p>
              <p className="dashListTitle">Date</p>
              <p className="dashListTitle">Quoted by</p>
            </div>
            <div className="DastStatusBody">
              {pquotes?.length ? (
                pquotes.filter(e => e.Status !== 'Sold')[0]?.map((e) => {
                  return (
                    <NavLink
                    style={{ textDecoration: "none", color: "#000" }}
                    to={{
                      pathname: "report/quote",
                      aboutProps: { ID: e.id },
                    }}
                  >
                  
                    <div className="DashStatusRow">
                      <p className="infoDashboardProducer">
                      {e.Client.name}
                      </p>
                      <p className="infoDashboardProducer">
                      {e.Company.name}
                      </p>
                      <p className="infoDashboardProducer">
                     {e.monthlyPayment}
                      </p>
                      <p className="infoDashboardProducer">
                      {e.down}
                      </p>
                      <p className="infoDashboardProducer">
                      {e.date}
                      </p>
                      <p className="infoDashboardProducer">
                       {e.User.name}
                      </p>
                    </div>
                    </NavLink>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="DashStatusCont1" style={{marginLeft: '20px'}}>
            <div className="DashStatusHeader">
              <p className="DashPListTitle">Sold Quotes This Month</p>
            </div>
            <div className="DashStatusColumns">
              <p className="dashListTitle">Client Name</p>
              <p className="dashListTitle">Company</p>
              <p className="dashListTitle">Monthly Paym.</p>
              <p className="dashListTitle">Down</p>
              <p className="dashListTitle">Closing Date</p>
              <p className="dashListTitle">Quoted by</p>
            </div>
            <div className="DastStatusBody">
              {pquotes?.length ? (
                pquotes.filter(e => e.Status !== 'Sold')[1]?.map((e) => {
                  return (
                    <NavLink
                    style={{ textDecoration: "none", color: "#000" }}
                    to={{
                      pathname: "report/quote",
                      aboutProps: { ID: e.id },
                    }}
                  >
                  
                    <div className="DashStatusRow">
                      <p className="infoDashboardProducer">
                      {e.Client?.name}
                      </p>
                      <p className="infoDashboardProducer">
                      {e.Company.name}
                      </p>
                      <p className="infoDashboardProducer">
                     {e.monthlyPayment}
                      </p>
                      <p className="infoDashboardProducer">
                      {e.down}
                      </p>
                      <p className="infoDashboardProducer">
                      {e?.closingDate}
                      </p>
                      <p className="infoDashboardProducer">
                       {e.User?.name}
                      </p>
                    </div>
                    </NavLink>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="dashContCard">
          <div className="dashCard" style={{
                marginLeft: "50px",
                backgroundColor: " rgba(255, 122, 0, 0.15)",
              }}>
          <div
                className="dashCircle"
                style={{ backgroundColor: "rgba(239, 239, 239,0.3)" }}
              >
                <img src={error} />
              </div>
            <div className="dashText">
              <p className="dashCardTitle">
                {
                  pquotes[0]?.length
                }
              </p>
              <p className="dashCardText">Unsold quotes this month</p>
            </div>
          </div>
          <div className="dashCard" style={{
                marginLeft: "50px",
                backgroundColor: " rgba(111, 82, 237, 0.15)",
              }}>
             <div
                className="dashCircle"
                style={{ backgroundColor: "rgba(239, 239, 239,0.3)" }}
              >
              <img src={wbill} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">
                {pquotes[1]?.length}
              </p>
              <p className="dashCardText">Total quotes sold this month</p>
            </div>
          </div>
          <div className="dashCard" style={{
                  marginLeft: "50px",
                  backgroundColor: "rgba(51, 214, 159 ,0.15)",
                }}>
            <div
              className="dashCircle"
              style={{ backgroundColor: "rgba(239, 239, 239,0.3)" }}
            >
              <img src={wbill} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">${NSD}</p>
              <p className="dashCardText">Total NSD commision</p>
            </div>
          </div>
          <div className="dashCard" style={{
                  marginLeft: "50px",
                  backgroundColor: "rgba(204, 234, 59 ,0.15)",
                }}>
            <div
                  className="dashCircle"
                  style={{ backgroundColor: " rgba(8, 76, 97, 0.07)" }}
                >
              <img src={bbill} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">{payments?.length}</p>
              <p className="dashCardText">Total payments this month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboardComponent;
