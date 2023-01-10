import React, { useEffect, useState } from "react";
import {
  BsChevronRight,
  BsChevronLeft,
  BsExclamationCircleFill,
} from "react-icons/bs";
import PizzaChart from "../Charts/ProducersChart";
import PozzaChart from "../Charts/ColumnChar";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import PizzaChartBig from "../Charts/ProducersChartBig";
import spinnerr from "../assets/loadingIcon.gif";
import { BiDollarCircle, BiMoney, BiWallet } from "react-icons/bi";

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
  A_AVG,
}) => {
  const [graficType, setGraficType] = useState();
  const [graficMultiple, setGraficMultiple] = useState(true);
  const [styleTable, setStyleTable] = useState("divTable2");
  const [chevron, setChevron] = useState("bsChevron3");
  const [circle, setCircle] = useState("circle4");

  let quotexWithoutAdmin = A_AVG?.filter((e) => e.id !== 1 && e.id !== 24);

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
                setGraficMultiple();
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
                quotex?.length &&
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

            {/* {typeOfTable === "Sold" ? (
              <div className="DashPList1">
                <div className="DashPListHeader">
                  <p className="DashPListTitle">Producers Sold Ranking</p>
                  <p className="DashPListSTitle">Desc.</p>
                </div>
                <div className="DashPListDivider" />
                {soldQuotes?.map((e) => {
                  return (
                    <NavLink
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        color: "black",
                      }}
                      to={{
                        pathname: "/users/producers/details",
                        aboutProps: producers.filter((f) => f.name === e[0])[0],
                      }}
                    >
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
                            <BiUser size={"20px"} color={"#2b4162"} />
                          </div>

                          <p className="DashPListItemText">{e[0]}</p>
                        </div>
                        <div className="DashNumberDiv">
                          <p className="DashNumber">{e[1]}</p>
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            ) : typeOfTable === "Unsold" ? (
              <div className="DashPList1">
                <div className="DashPListHeader">
                  <p className="DashPListTitle">Producers Unsold Ranking</p>
                  <p className="DashPListSTitle">Desc.</p>
                </div>
                <div className="DashPListDivider" />
                {unsoldQuotes?.map((e) => {
                  return (
                    <NavLink
                      style={{
                        textDecoration: "none",
                        color: "#000",
                        color: "black",
                      }}
                      to={{
                        pathname: "/users/producers/details",
                        aboutProps: producers.filter((f) => f.name === e[0])[0],
                      }}
                    >
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
                            <BiUser size={"20px"} color={"#2b4162"} />
                          </div>

                          <p className="DashPListItemText">{e[0]}</p>
                        </div>
                        <div className="DashNumberDiv">
                          <p className="DashNumber">{e[2]}</p>
                        </div>
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            ) : (
              <div className="DashPList1">
                <div className="DashPListHeader">
                  <p className="DashPListTitle">Producers average sale</p>
                  <p className="DashPListSTitle">Desc.</p>
                </div>
                <div className="DashPListDivider" />
                {quotexWithoutAdmin
                  ?.sort(function (a, b) {
                    return Number(b.avg) - Number(a.avg);
                  })
                  .map((e) => {
                    return (
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          color: "black",
                        }}
                        to={{
                          pathname: "/users/producers/details",
                          aboutProps: producers?.filter(
                            (f) => f.UserId === e.id
                          )[0],
                        }}
                      >
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
                              <BiUser size={"20px"} color={"#2b4162"} />
                            </div>

                            <p className="DashPListItemText">{e.name}</p>
                          </div>
                          <div className="DashNumberDiv">
                            <p className="DashNumber">{e.avg}%</p>
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
              </div>
            )} */}
          </div>
          <div className="dashContCard">
            <div
              className="dashCard"
              style={{
                marginLeft: "50px",
                backgroundColor: " rgba(0, 39, 82,0.8)",
              }}
            >
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <BsExclamationCircleFill size="28px" color="#002752" />
              </div>
              <div className="dashText">
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {unSold}
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
              <div
                className="dashCircle"
                style={{ backgroundColor: "#ebeff2" }}
              >
                <BiDollarCircle size="35px" color="#D8AF4D" />
              </div>
              <div className="dashText">
                <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                  {sold}
                </p>
                <p className="dashCardText" style={{ color: "#ebeff2" }}>
                  Sold quotes
                </p>
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
                            e.date?.substring(0, 7) == DATE.substring(0, 7) &&
                            parseFloat(e.NSDvalue)
                        ),
                },
              }}
            >
              <div
                className="dashCard"
                style={{
                  marginLeft: "50px",
                  backgroundColor: "#98473E",
                }}
              >
                <div
                  className="dashCircle"
                  style={{ backgroundColor: "#ebeff2" }}
                >
                  <BiMoney size="35px" color="#98473E" />
                </div>
                <div className="dashText">
                  <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                    ${NSD}
                  </p>
                  <p className="dashCardText" style={{ color: "#ebeff2" }}>
                    NSD sales
                  </p>
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
                          (e) => e.date?.substring(0, 7) == DATE.substring(0, 7)
                        ),
                },
              }}
            >
              <div
                className="dashCard"
                style={{
                  marginLeft: "50px",
                  backgroundColor: "#84596B",
                }}
              >
                <div
                  className="dashCircle"
                  style={{ backgroundColor: "#ebeff2" }}
                >
                  <BiWallet size="28px" color="#84596B" />
                </div>
                <div className="dashText">
                  <p className="dashCardTitle" style={{ color: "#ebeff2" }}>
                    {
                      Payment?.filter(
                        (e) => e.date.substring(0, 7) == DATE.substring(0, 7)
                      ).length || '...'
                    }
                  </p>
                  <p className="dashCardText" style={{ color: "#ebeff2" }}>
                   Total payments
                  </p>
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
                {modifiedList?.length ? (
                  modifiedList?.map((e) => {
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
                                  ? "#D8AF4D"
                                  : e.Status == "Renew down"
                                  ? "rgba(0, 39, 82, 0.5)"
                                  : "rgba(0, 39, 82, 0.5)",
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
                  <div>
                    <img
                      src={spinnerr}
                      style={{
                        width: "100px",
                      }}
                    />
                  </div>
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
            cursor: "pointer",
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
      <div className={styleTable}>
        <table className="table6">
          <tbody>
            <tr style={{ position: "fixed", top: "125px", width: "650px" }}>
              <th scope="col">
                <p className="REPtype2" style={{ width: "320px" }}>
                  Name
                </p>
              </th>

              <th scope="col" className="column1" style={{ width: "90px" }}>
                <p className="REPtype2">% Sold</p>
              </th>
              <th scope="col" className="column1" style={{ width: "60px" }}>
                <p className="REPtype2">Sold</p>
              </th>
              <th scope="col" className="column1" style={{ width: "60px" }}>
                <p className="REPtype2">Unsold</p>
              </th>
            </tr>

            {quotexWithoutAdmin
              ?.sort(function (a, b) {
                return Number(b.avg) - Number(a.avg);
              })
              ?.map((e) => {
                return (
                  <tr>
                    <td className="ClientName2" scope="row">
                      {e.name}
                    </td>
                    <td
                      className="ClientName2"
                      scope="row"
                      style={{ textAlign: "center", minWidth: "30px" }}
                    >
                      {e.avg}%
                    </td>
                    <td
                      className="ClientName2"
                      scope="row"
                      style={{ textAlign: "center", minWidth: "30px" }}
                    >
                      {e.sold}
                    </td>
                    <td
                      className="ClientName2"
                      scope="row"
                      style={{ textAlign: "center", minWidth: "30px" }}
                    >
                      {e.unsold}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {styleTable === "divTable2" && (
          <div
            className={circle}
            onClick={() => {
              setStyleTable("divTable");
              setChevron("bsChevron");
              setCircle("circle2");
            }}
          >
            <BsChevronLeft cursor="pointer" color="white" className={chevron} />
          </div>
        )}
        {styleTable === "divTable3" && (
          <div
            className={circle}
            onClick={() => {
              setStyleTable("divTable");
              setChevron("bsChevron");
              setCircle("circle2");
            }}
          >
            <BsChevronLeft cursor="pointer" color="white" className={chevron} />
          </div>
        )}

        {styleTable === "divTable" && (
          <div
            className={circle}
            onClick={() => {
              setStyleTable("divTable3");
              setChevron("bsChevron2");
              setCircle("circle3");
            }}
          >
            <BsChevronLeft cursor="pointer" color="white" className={chevron} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardComponent;
