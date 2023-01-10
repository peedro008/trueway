import React from "react";
import error from "../assets/error.png";
import wbill from "../assets/wbill.png";
import bbill from "../assets/bbill.png";
import mask from "../assets/mask.png";
import { NavLink } from "react-router-dom";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiDollarCircle, BiMoney, BiWallet } from "react-icons/bi";

const ProducerDashboardComponent = ({ NSD, pquotes, payments, user }) => {

  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Welcome {user.Name}</p>
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
                pquotes
                  .filter((e) => e.Status !== "Sold")[0]
                  ?.map((e) => {
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
                          <p className="infoDashboardProducer">{e.down}</p>
                          <p className="infoDashboardProducer">{e.date}</p>
                          <p className="infoDashboardProducer">{e.User.name}</p>
                        </div>
                      </NavLink>
                    );
                  })
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="DashStatusCont1" style={{ marginLeft: "20px" }}>
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
                pquotes
                  .filter((e) => e.Status !== "Sold")[1]
                  ?.map((e) => {
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
                          <p className="infoDashboardProducer">{e.down}</p>
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
          <div
            className="dashCard"
            style={{
              marginLeft: "50px",
              backgroundColor: " rgba(0, 39, 82,0.8)",
            }}
          >
            <div className="dashCircle" style={{ backgroundColor: "#ebeff2" }}>
              <BsExclamationCircleFill size="28px" color="#002752" />
            </div>
            <div className="dashText">
              <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                {pquotes[0]?.length}
              </p>
              <p className="dashCardText" style={{ color: "#ebeff2" }}>
                Unsold quotes
              </p>
            </div>
          </div>
          <div
            className="dashCard"
            style={{
              marginLeft: "50px",
              backgroundColor: "#D8AF4D",
            }}
          >
            <div className="dashCircle" style={{ backgroundColor: "#ebeff2" }}>
              <BiDollarCircle size="35px" color="#D8AF4D" />
            </div>
            <div className="dashText">
              <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                {pquotes[1]?.length}
              </p>
              <p className="dashCardText" style={{ color: "#ebeff2" }}>
                Quotes sold
              </p>
            </div>
          </div>
          <div
            className="dashCard"
            style={{
              marginLeft: "50px",
              backgroundColor: "#98473E",
            }}
          >
            <div className="dashCircle" style={{ backgroundColor: "#ebeff2" }}>
              <BiMoney size="35px" color="#98473E" />
            </div>
            <div className="dashText">
              <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                ${NSD}
              </p>
              <p className="dashCardText" style={{ color: "#ebeff2" }}>
                NSD commision
              </p>
            </div>
          </div>
          <div
            className="dashCard"
            style={{
              marginLeft: "50px",
              backgroundColor: "#84596B",
            }}
          >
            <div className="dashCircle" style={{ backgroundColor: "#ebeff2" }}>
              <BiWallet size="28px" color="#84596B" />
            </div>
            <div className="dashText">
              <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                {payments?.length}
              </p>
              <p className="dashCardText" style={{ color: "#ebeff2" }}>
                Payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboardComponent;
