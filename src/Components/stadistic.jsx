import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import StatsQuoted from "../Charts/stadisticChartQuoted";
import StatsSold from "../Charts/stadisticsChartSold";
import spinnerr from "../assets/loadingIcon.gif";

function StadisticComponent({
  Producers,
  yearLabel,
  userRole,
  UserId,
  yearOptions,
  monthOptions,
  setDateSelected,
  setYearLabel,
  dateSelected,
  search,
  payments,
  quotes,
  getComission,
  defMonth,
  dateReq,
  google,
  loader
}) {
  function sumarDias(fecha, dias){
    const date = new Date(fecha)
    date.setDate(date.getDate() + dias);
    return date;
  }
  console.log(sumarDias(dateReq.dateTo, -1)) 
  return (
    <div className="genericDiv1">
      <div className="StadCalendarDiv">
        <p className="StadCalendarTitle">{yearLabel}</p>

        <div className="StadSelectCont">
          <Select
            options={yearOptions.map((e) => {
              return { value: e, label: e };
            })}
            onChange={(e) => {
              setYearLabel(yearLabel.substring(0, 4) + e.value);
              setDateSelected(dateSelected.substring(0, 6) + e.value);
            }}
            className="StadSelect"
            // defaultInputValue={yearOptions[0]}
            placeholder="Year"
          />

          <Select
            options={monthOptions}
            className="StadSelect"
            placeholder="Month"
            onChange={(e) => {
              setYearLabel(e.label + yearLabel.substring(3, yearLabel.length));
              setDateSelected(
                e.value + dateSelected.substring(2, dateSelected.length)
              );
            }}
          />
        </div>
        <button
        
          onClick={search}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            height: "30px",
            width: "40%",
            alignSelf: "center",
            marginBlock: "7px",
            marginTop: "15px",
            fontFamily: "Gilroy-Regular",
            color: "white",
            boxShadow: "4px 4px 4px rgb(199, 199, 199)",
            backgroundColor: "#2b4162",
            borderWidth: 0,
            borderRadius: "8px",
          }}
        >
          Search
        </button>
      </div>
      {
        loader ?  <img
        src={spinnerr}
        style={{
          width: "150px",
          position: "absolute",
          marginLeft: '180px',
          top: "40vh",
        }}
      /> : <div className="StadisticRowName">
      {userRole == "Producer" ? (
        <div>
          <p className="StadisticProdName">
            {Producers.filter((e) => e.UserId == UserId)[0].name}
          </p>
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/report/genericReport",
              aboutProps: {
                type: "P",
                title: `NSD Sold ${yearLabel}`,
                producer: Producers.filter((e) => UserId == UserId)[0].name,
                items: payments.filter(
                  (f) => f.UserId == UserId && f.NSDvalue !== "0"
                ),
              },
            }}
          >
            <div className="StadBox">
              <p className="StadBoxTitle">NSD Sold</p>
              <p className="StadBoxVal">
                {
                  payments.filter(
                    (f) => f.UserId == UserId && f.NSDvalue !== "0"
                  ).length
                }
              </p>
            </div>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/report/genericReport",
              aboutProps: {
                type: "P",
                title: `NSD Sold ${yearLabel}`,
                producer: Producers.filter((e) => UserId == UserId)[0].name,
                items: payments.filter(
                  (f) => f.UserId == UserId && f.NSDvalue !== "0"
                ),
              },
            }}
          >
            <div className="StadBox">
              <p className="StadBoxTitle">NSD Commision</p>
              <p className="StadBoxVal">
                {getComission(
                  payments.filter(
                    (f) => f.UserId == UserId && f.NSDvalue !== "0"
                  ),
                  quotes.filter((f) => f.UserId == UserId)
                )}
              </p>
            </div>
          </NavLink>
          <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/report/genericReport",
                  aboutProps: {
                    type: "Q",
                    title: `New Polizas ${yearLabel}`,
                    producer: Producers.filter((e) => UserId == UserId)[0].name,
                    items: quotes.filter(
                      (f) =>
                        f.SoldBy == UserId &&
                        moment(`${f.closingDate}`).isBetween(
                          `${dateReq.dateFrom}`,
                          `${sumarDias(dateReq.dateTo, -1)}`,
                          undefined,
                          "[]"
                        )
                    ),
                  },
                }}
              >
                <div className="StadBox">
                  <p className="StadBoxTitle">New Polizas</p>
                  <p className="StadBoxVal">
                    {
                      quotes.filter(
                        (f) =>
                          f.SoldBy == UserId
                      ).length
                    }
                  </p>
                </div>
              </NavLink>
         
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/report/genericReport",
              aboutProps: {
                type: "Q",
                title: `Quotes ${yearLabel}`,
                producer: Producers.filter((e) => UserId == UserId)[0].name,
                items: quotes.filter((f) => f.UserId == UserId),
              },
            }}
          >
            <div className="StadBox">
              <p className="StadBoxTitle">Quotes</p>
              <p className="StadBoxVal">
                {quotes.filter((f) => f.UserId == UserId).length}
              </p>
            </div>
          </NavLink>
          <NavLink
            style={{ textDecoration: "none" }}
            to={{
              pathname: "/report/genericReport",
              aboutProps: {
                type: "Q",
                title: `Cancelations ${yearLabel}`,
                producer: Producers.filter((e) => UserId == UserId)[0].name,
                items: quotes.filter(
                  (f) =>
                    f.UserId == UserId &&
                    f.QuoteStatuses[0].Status == "Cancelled"
                ),
              },
            }}
          >
            <div className="StadBox">
              <p className="StadBoxTitle">Cancelations</p>
              <p className="StadBoxVal">
                {
                  quotes.filter(
                    (f) =>
                      f.UserId == UserId &&
                      f.QuoteStatuses[0].Status == "Cancelled"
                  ).length
                }
              </p>
            </div>
          </NavLink>
        </div>
      ) : (
        Producers.map((e, i) => {
          return (
            <div style={{marginRight: '20px'}}>
              <p
                style={{ color: 'rgb(43, 65, 98)' }}
                className="StadisticProdName"
              >
                {e.name}
              </p>
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/report/genericReport",
                  aboutProps: {
                    type: "P",
                    title: `NSD Sold ${yearLabel}`,
                    producer: e.name,
                    items: payments.filter(
                      (f) => f.UserId == e.UserId && f.NSDvalue !== "0"
                    ),
                  },
                }}
              >
                <div className="StadBox">
                  <p className="StadBoxTitle">NSD Sold</p>
                  <p className="StadBoxVal">
                    {
                      payments.filter(
                        (f) => f.UserId == e.UserId && f.NSDvalue !== "0"
                      ).length
                    }
                  </p>
                </div>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/report/genericReport",
                  aboutProps: {
                    type: "P",
                    title: `NSD Sold ${yearLabel}`,
                    producer: e.name,
                    items: payments.filter(
                      (f) => f.UserId == e.UserId && f.NSDvalue !== "0"
                    ),
                  },
                }}
              >
                <div className="StadBox">
                  <p className="StadBoxTitle">NSD Commision</p>
                  <p className="StadBoxVal">
                    {getComission(
                      payments.filter(
                        (f) => f.UserId == e.UserId && f.NSDvalue !== "0"
                      ),
                      quotes.filter((f) => f.UserId == e.UserId)
                    )}
                  </p>
                </div>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/report/genericReport",
                  aboutProps: {
                    type: "Q",
                    title: `New Polizas ${yearLabel}`,
                    producer: e.name,
                    items: quotes.filter(
                      (f) =>
                        f.SoldBy == e.UserId &&
                        moment(`${f.closingDate}`).isBetween(
                          `${dateReq.dateFrom}`,
                          `${sumarDias(dateReq.dateTo, -1)}`,
                          undefined,
                          "[]"
                        )
                    ),
                  },
                }}
              >
                <div className="StadBox">
                  <p className="StadBoxTitle">New Polizas</p>
                  <p className="StadBoxVal">
                    {
                       quotes.filter(
                        (f) =>
                          f.SoldBy == e.UserId &&
                          moment(`${f.closingDate}`).isBetween(
                            `${dateReq.dateFrom}`,
                            `${sumarDias(dateReq.dateTo, -1)}`,
                            undefined,
                            "[]"
                          )
                      ).length
                    }
                  </p>
                </div>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/report/genericReport",
                  aboutProps: {
                    type: "Q",
                    title: `Quotes ${yearLabel}`,
                    producer: e.name,
                    items: quotes.filter((f) => f.UserId == e.UserId),
                  },
                }}
              >
                <div className="StadBox">
                  <p className="StadBoxTitle">Quotes</p>
                  <p className="StadBoxVal">
                    {quotes.filter((f) => f.UserId == e.UserId).length}
                  </p>
                </div>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/report/genericReport",
                  aboutProps: {
                    type: "Q",
                    title: `Cancelations ${yearLabel}`,
                    producer: e.name,
                    items: quotes.filter(
                      (f) =>
                        f.UserId == e.UserId &&
                        f.QuoteStatuses[0].Status == "Cancelled"
                    ),
                  },
                }}
              >
                <div className="StadBox">
                  <p className="StadBoxTitle">Cancelations</p>
                  <p className="StadBoxVal">
                    {
                      quotes.filter(
                        (f) =>
                          f.UserId == e.UserId &&
                          f.QuoteStatuses[0].Status == "Cancelled"
                      ).length
                    }
                  </p>
                </div>
              </NavLink>
            </div>
          );
        })
      )}
    </div>
      }
     
      {userRole !== "Producer" ? (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {google && quotes.length ? (
            <StatsSold google={google} quotes={quotes} producers={Producers} />
          ) : (
            <></>
          )}

          {google && quotes.length ? (
            <StatsQuoted
              google={google}
              quotes={quotes}
              producers={Producers}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
       
    </div>
  );
}

export default StadisticComponent;
