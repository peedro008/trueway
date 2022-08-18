import React  from "react";
import error from "../assets/error.png";
import wbill from "../assets/wbill.png";
import bbill from "../assets/bbill.png";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import mask from "../assets/mask.png";
import PizzaChart from "../Charts/ProducersChart";
import PozzaChart from "../Charts/ColumnChar";
import { NavLink } from "react-router-dom";


const AdminDashboardComponent = ({
    next,
setNext,
mquotes,
setAsd,
status,
setStatus,
dataList,
setDataList,
sold,
setSold,
unSold,
mModify,
modifiedList,
setModifiedList,
NSD,
setNSD,
producers,
google,
UserId,
modify,
quotes,
payments,
handleNext,
mpayments
}) => {
  
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Dashboard</p>
      </div>
      {!next ? (
        <div className="DashContainer">
          <div className="DashSubCont">
            <div style={{ marginLeft: "-100px" }}>
              {google && <PizzaChart google={google} />}
            </div>
            <div className="DashPList1" >
              <div className="DashPListHeader">
                <p className="DashPListTitle">Producers average sale</p>
                <p className="DashPListSTitle">Descending</p>
              </div>
              <div className="DashPListDivider" />
              {dataList.map((e) => {
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
                            aboutProps: e[3],
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
                            aboutProps: e[3],
                          }}
                        >
                          {e[0]}
                        </NavLink>
                      </p>
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
                    mquotes?.filter(
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
                  {mModify?.filter((e) => e.Status == "Sold").length
                    ? mModify?.filter((e) => e.Status == "Sold").length
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
                <p className="dashCardTitle">
                  ${NSD}
                </p>
                <p className="dashCardText">Total NSD sales</p>
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
                <p className="dashCardTitle">{mpayments?.length?mpayments?.length:0}</p>
                <p className="dashCardText">Total payments per month</p>
              </div>
            </div>
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
                        <div className="DashStatusItem" style={{maxHeight:"40px"}}>
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
