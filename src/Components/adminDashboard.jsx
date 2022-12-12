import React, { useState } from "react";
import error from "../assets/error.png";
import wbill from "../assets/wbill.png";
import bbill from "../assets/bbill.png";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import mask from "../assets/mask.png";
import PizzaChart from "../Charts/ProducersChart";
import PozzaChart from "../Charts/ColumnChar";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import PizzaChartBig from "../Charts/ProducersChartBig";

const AdminDashboardComponent = ({
  next,
  DATE,
  quotex,
  userRole,
  sold,
  unSold,
  modifiedList,
  NSD,
  producers,
  google,
  Payment,
  handleNext,
  mpayments,
}) => {
  const [graficType, setGraficType] = useState();
  const [graficMultiple, setGraficMultiple] = useState(true);

  const options = [
    { value: "All", label: "All" },
    { value: "Sold", label: "Sold" },
    { value: "Unsold", label: "Unsold" },
  ];

  return (
    <div className="genericDiv">
      <div className="genericHeader" style={{ display: "flex" }}>
        <p className="genericTitle">Trueway Agents </p>
        {!next && (
          <Select
            options={options}
            onChange={(e) => {
              setGraficType(e.value);
              if (e.value !== "All") {
                setGraficMultiple(false);
              } else {
                setGraficMultiple(true);
              }
            }}
            className="StadSelectGrafic"
            placeholder="Type"
          />
        )}
      </div>

      {!next ? (
        <div className="DashContainer">
          <div className="DashSubCont">
            <div style={{ marginLeft: "-100px" }}>
              {google &&
                quotex &&
                quotex.length &&
                (graficMultiple ? (
                  <PizzaChart google={google} producers={producers} />
                ) : (
                  <PizzaChartBig
                    google={google}
                    producers={producers}
                    graficType={graficType}
                  />
                ))}
            </div>
            <div className="DashPList1">
              <div className="DashPListHeader">
                <p className="DashPListTitle">Producers average sale</p>
                <p className="DashPListSTitle">Desc.</p>
              </div>
              <div className="DashPListDivider" />
              {quotex
                ?.sort(function (a, b) {
                  return Number(b.avg) - Number(a.avg);
                })
                .map((e) => {
                  return (
                    <div
                      className="DashPListRow1"
                      style={{ marginBottom: "7px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <div className="DashPListCircle">
                          <NavLink
                            style={{
                              textDecoration: "none",
                              color: "#000",
                              color: "black",
                            }}
                            to={{
                              pathname: "/users/producers/details",
                              aboutProps: e.id,
                            }}
                          >
                            <img src={mask} />
                          </NavLink>
                        </div>

                        <p className="DashPListItemText">
                          <NavLink
                            style={{
                              textDecoration: "none",
                              color: "#000",
                              color: "black",
                            }}
                            to={{
                              pathname: "/users/producers/details",
                              aboutProps: e.id,
                            }}
                          >
                            {e.name}
                          </NavLink>
                        </p>
                      </div>
                      <div className="DashNumberDiv">
                        <p className="DashNumber">{e.avg}%</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="dashContCard">
            <div
              className="dashCard"
              style={{
                marginLeft: "50px",
                backgroundColor: " rgba(255, 122, 0, 0.15)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "rgba(239, 239, 239,0.3)" }}
              >
                <img src={error} />
              </div>
              <div className="dashText">
                <p className="dashCardTitle">{unSold}</p>
                <p className="dashCardText">Unsold quotes</p>
              </div>
            </div>
            <div
              className="dashCard"
              style={{
                marginLeft: "50px",
                backgroundColor: " rgba(111, 82, 237, 0.15)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "rgba(239, 239, 239,0.3)" }}
              >
                <img src={wbill} />
              </div>
              <div className="dashText">
                <p className="dashCardTitle">{sold}</p>
                <p className="dashCardText">Sold quotes</p>
              </div>
            </div>
            <NavLink
              style={{ textDecoration: "none" }}
              to={{
                pathname: "/report/genericReport",
                aboutProps: {
                  type: "P",
                  title: `NSD Sold`,
                  items:
                    userRole == "Manager"
                      ? mpayments
                      : Payment?.filter(
                          (e) =>
                            e.date.substring(0, 7) == DATE.substring(0, 7) &&
                            parseFloat(e.NSDvalue)
                        ),
                },
              }}
            >
              <div
                className="dashCard"
                style={{
                  marginLeft: "50px",
                  backgroundColor: "rgba(51, 214, 159 ,0.15)",
                }}
              >
                <div
                  className="dashCircle"
                  style={{ backgroundColor: "rgba(239, 239, 239,0.3)" }}
                >
                  <img src={wbill} />
                </div>
                <div className="dashText">
                  <p className="dashCardTitle">${NSD}</p>
                  <p className="dashCardText">Total NSD sales</p>
                </div>
              </div>
            </NavLink>
            <NavLink
              style={{ textDecoration: "none" }}
              to={{
                pathname: "/report/genericReport",
                aboutProps: {
                  type: "P",
                  title: `Payments this Month`,
                  items:
                    userRole == "Manager"
                      ? mpayments
                      : Payment?.filter(
                          (e) => e.date.substring(0, 7) == DATE.substring(0, 7)
                        ),
                },
              }}
            >
              <div
                className="dashCard"
                style={{
                  marginLeft: "50px",
                  backgroundColor: "rgba(204, 234, 59 ,0.15)",
                }}
              >
                <div
                  className="dashCircle"
                  style={{ backgroundColor: " rgba(8, 76, 97, 0.07)" }}
                >
                  <img src={bbill} />
                </div>
                <div className="dashText">
                  <p className="dashCardTitle">
                    {
                      Payment?.filter(
                        (e) => e.date.substring(0, 7) == DATE.substring(0, 7)
                      ).length
                    }
                  </p>
                  <p className="dashCardText">Total payments</p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="DashContainer">
          <div
            className="DashSubCont"
            style={{ justifyContent: "space-between", paddingRight: "40px" }}
          >
            {google && <PozzaChart google={google} />}
            <div className="DashStatusCont">
              <div className="DashStatusHeader">
                <p className="DashPListTitle">
                  Notification of modified policies
                </p>
              </div>
              <div className="DashStatusColumns">
                <p className="dashListColumnT1">QUOTE ID</p>
                <p className="dashListColumnT2">CLIENT NAME</p>
                <p className="dashListColumnT">CUSTOMER</p>
                <p className="dashListColumnT">DATE</p>
                <p className="dashListColumnT">STATUS</p>
              </div>
              <div className="DastStatusBody">
                {modifiedList.length ? (
                  modifiedList.map((e) => {
                    return (
                      <div className="DashStatusRow">
                        <p className="DashStatusItem1">
                          <NavLink
                            style={{ textDecoration: "none", color: "#000" }}
                            to={{
                              pathname: "/report/quote",
                              aboutProps: { ID: e.Quote.id },
                            }}
                          >
                            {e.Quote.id}
                          </NavLink>
                        </p>
                        <p className="DashStatusItem2">
                          <NavLink
                            style={{ textDecoration: "none", color: "#000" }}
                            to={{
                              pathname: "/report/quote",
                              aboutProps: { ID: e.Quote.id },
                            }}
                          >
                            {e.Quote.Client.name}
                          </NavLink>
                        </p>
                        <p className="DashStatusItem">
                          <NavLink
                            style={{ textDecoration: "none", color: "#000" }}
                            to={{
                              pathname: "/report/quote",
                              aboutProps: { ID: e.Quote.id },
                            }}
                          >
                            {e.User.name}
                          </NavLink>
                        </p>
                        <p className="DashStatusItem">
                          <NavLink
                            style={{ textDecoration: "none", color: "#000" }}
                            to={{
                              pathname: "/report/quote",
                              aboutProps: { ID: e.Quote.id },
                            }}
                          >
                            {e.date}
                          </NavLink>
                        </p>
                        <div
                          className="DashStatusItem"
                          style={{ maxHeight: "40px" }}
                        >
                          <div
                            className="DashStatusColor"
                            style={{
                              backgroundColor:
                                e.Status == "Cancelled"
                                  ? "#D14343"
                                  : e.Status == "Sold"
                                  ? "#14B8A6"
                                  : e.Status == "Renew down"
                                  ? "#FFB020"
                                  : "#777DA7",
                            }}
                          >
                            <p className="DashStatusItemC">
                              <NavLink
                                style={{
                                  textDecoration: "none",
                                  color: "#000",
                                }}
                                to={{
                                  pathname: "/report/quote",
                                  aboutProps: { ID: e.Quote.id },
                                }}
                              >
                                {e.Status}
                              </NavLink>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {!next ? (
        <BsChevronRight
          color="grey"
          style={{
            minWidth: "40px",
            minHeight: "40px",
            position: "absolute",
            right: "1%",
            top: "50%",
            alignSelf: "flex-start",
          }}
          onClick={handleNext}
        />
      ) : (
        <BsChevronLeft
          cursor="pointer"
          color="grey"
          style={{
            minWidth: "40px",
            minHeight: "40px",
            position: "absolute",
            right: "1%",
            top: "50%",
            alignSelf: "flex-start",
          }}
          onClick={handleNext}
        />
      )}
    </div>
  );
};

export default AdminDashboardComponent;
