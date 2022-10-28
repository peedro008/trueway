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
}) => {
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Dashboard</p>
      </div>

      <div className="DashContainer">
        <div className="DashSubCont1">
          <div className="DashStatusCont1">
            <div className="DashStatusHeader">
              <p className="DashPListTitle">Unsold Quotes</p>
            </div>
            <div className="DashStatusColumns">
              <p className="dashListColumnT">Client Name</p>
              <p className="dashListColumnT">Company</p>
              <p className="dashListColumnT">Monthly Payments</p>
              <p className="dashListColumnT">Down</p>
              <p className="dashListColumnT">Date</p>
              <p className="dashListColumnT">Quoted by</p>
            </div>
            <div className="DastStatusBody">
              {status?.length ? (
                status.map((e) => {
                  return (
                    <div className="DashStatusRow">
                      <p className="DashStatusItem">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "report/quote",
                            aboutProps: { ID: e.id },
                          }}
                        >
                          {e.Client.name.substring(0, 15)}
                        </NavLink>
                      </p>
                      <p className="DashStatusItem">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "report/quote",
                            aboutProps: { ID: e.id },
                          }}
                        >
                          {e.Company.name}
                        </NavLink>
                      </p>
                      <p className="DashStatusItem">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "report/quote",
                            aboutProps: { ID: e.id },
                          }}
                        >
                          {e.monthlyPayment}
                        </NavLink>
                      </p>
                      <p className="DashStatusItem">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "report/quote",
                            aboutProps: { ID: e.id },
                          }}
                        >
                          {e.down}
                        </NavLink>
                      </p>
                      <p className="DashStatusItem">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "report/quote",
                            aboutProps: { ID: e.id },
                          }}
                        >
                          {e.date}
                        </NavLink>
                      </p>
                      <p className="DashStatusItem">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "report/quote",
                            aboutProps: { ID: e.id },
                          }}
                        >
                          {e.User.name}
                        </NavLink>
                      </p>
                    </div>
                  );
                })
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="DashPList1">
            <div className="DashPListHeader">
              <p className="DashPListTitle">Sellers average sale</p>
              <p className="DashPListSTitle">Descending</p>
            </div>
            <div className="DashPListDivider" />
            {dataList.map((e) => {
              return (
                <div className="DashPListRow1" style={{ marginBottom: "7px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div className="DashPListCircle">
                      <img src={mask} />
                    </div>

                    <p className="DashPListItemText">{e[0]}</p>
                  </div>
                  <div className="DashNumberDiv">
                    <p className="DashNumber">
                    {e[1] / e[2]
                          ? e[1] / e[2] > 1
                            ? 100
                            : ((e[1] / e[2]) * 100).toFixed(0)
                          : 0}
                      %
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dashContCard">
          <div className="dashCard">
            <div
              className="dashCircle"
              style={{ backgroundColor: " rgba(255, 184, 0, 0.07)" }}
            >
              <img src={error} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">
                {
                  quotes2?.filter(
                    (e) =>
                      e.QuoteStatuses.sort(function (a, b) {
                        return b.id - a.id;
                      })[0].Status == "Quoted"
                  ).length
                }
              </p>
              <p className="dashCardText">Unsold quotes</p>
            </div>
          </div>
          <div className="dashCard" style={{ marginLeft: "50px" }}>
            <div
              className="dashCircle"
              style={{ backgroundColor: " rgba(76, 184, 255, 0.07)" }}
            >
              <img src={wbill} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">
                {modify?.filter((e) => e.Status == "Sold").length
                  ? modify.filter((e) => e.Status == "Sold").length
                  : 0}
              </p>
              <p className="dashCardText">Total quotes sold per month</p>
            </div>
          </div>
          <div className="dashCard" style={{ marginLeft: "50px" }}>
            <div
              className="dashCircle"
              style={{ backgroundColor: " rgba(76, 184, 255, 0.07)" }}
            >
              <img src={wbill} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">${NSD}</p>
              <p className="dashCardText">Total NSD commision</p>
            </div>
          </div>
          <div className="dashCard" style={{ marginLeft: "50px" }}>
            <div
              className="dashCircle"
              style={{ backgroundColor: " rgba(8, 76, 97, 0.07)" }}
            >
              <img src={bbill} />
            </div>
            <div className="dashText">
              <p className="dashCardTitle">{payments.length}</p>
              <p className="dashCardText">Total payments per month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboardComponent;
