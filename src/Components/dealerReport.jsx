import React from "react";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import { BsChevronLeft } from "react-icons/bs";

import { AiOutlineCloseCircle, AiOutlineFilter } from "react-icons/ai";

import close from "../assets/close.svg";
import Select from "react-select";

import Modal from "react-responsive-modal";
const DealerReportComponent = ({
  dealerFil,
  openFilter,
  open,
  modalPay,
  selectedDealer,
  filterValues,
  filterCheck,
  setDealerFil,
  setOpenFilter,
  setOpen,
  setModalPay,
  setSelectedDealer,
  setFilterValues,
  setFilterCheck,
  onCloseModal,
  clients,
  dealerSalePerson,
  Dealers,
  handleOpenModal,
  handlePayModal,
  PayDealer,
  filterSubmit,
  closeCloud,
}) => {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Dealer Report</p>
      </div>
      <div className="REPcontrol">
        <div className="REPDate">
          {filterValues.dateFrom && filterValues.dateTo && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                From:&nbsp;<strong>{filterValues.dateFrom}</strong>
              </p>
              <p className="cloudFilterText" style={{ marginLeft: "5px" }}>
                To:&nbsp;<strong>{filterValues.dateTo}</strong>
              </p>

              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud({ ...filterValues, dateFrom: null, dateTo: null });
                }}
              />
            </div>
          )}
          {filterValues.dateFrom1 && filterValues.dateTo1 && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                From:&nbsp;<strong>{filterValues.dateFrom}</strong>
              </p>
              <p className="cloudFilterText" style={{ marginLeft: "5px" }}>
                To:&nbsp;<strong>{filterValues.dateTo}</strong>
              </p>

              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud({ ...filterValues, dateFrom: null, dateTo: null });
                }}
              />
            </div>
          )}
          {filterValues.ClientId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Client name:
                {clients.find((c) => c.id == filterValues.ClientId).name}
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud({ ...filterValues, ClientId: null });
                }}
              />
            </div>
          )}
          {filterValues.DealerSalePersonId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Dealer name:
                {
                  Dealers.find((c) => c.id == filterValues.DealerSalePersonId)
                    .name
                }
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud({ ...filterValues, DealerSalePersonId: null });
                }}
              />
            </div>
          )}
        </div>
       
          <div
        style={{
          cursor:'pointer',
          position: "fixed",
          right: "50px",
          top: "85px",
          display: "flex",
        }}
      >
        <AiOutlineFilter
          color="#2b4162"
          size={"40px"}
          onClick={() => setOpenFilter(!openFilter)}
        />
      </div>
        
      </div>
      <table class="table2">
        <tbody>
          <tr>
            <th scope="col" className="column1">
              <p className="REPtype">Client Name</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Dealer Sale Person</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Date Sold</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Amount</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Date Paid</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Paid</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Pay</p>
            </th>
          </tr>
          {dealerFil &&
            Dealers?.sort(function (a, b) {
              return b.id - a.id;
            }).map((e) => {
              return (
                <tr>
                  <td className="ClientName" scope="row">
                    {e.Client.name}
                  </td>
                  <td className="ClientName" scope="row">
                    {e.DealerSalePerson?.name}
                  </td>
                  <td className="ClientName" scope="row">
                    {e.dateSold}
                  </td>
                  <td className="ClientName" scope="row">
                    ${e.amount}
                  </td>
                  <td className="ClientName" scope="row">
                    {e.datePaid ? e.datePaid.substring(0,10) : "Unpaid"}
                  </td>
                  <td
                    className="ClientName"
                    style={{ padding: "0" }}
                    scope="row"
                  >
                    {e.paid ? (
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#14B8A6",
                          width: "100%",
                          minWidth: "50px",
                          height: "100%",
                        }}
                      ></div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          backgroundColor: "#D14343",
                          width: "100%",
                          minWidth: "50px",
                          height: "100%",
                        }}
                      ></div>
                    )}
                  </td>
                  <td
                    className="ClientName"
                    style={{
                      padding: 0,
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                    }}
                  >
                    {!e.paid && (
                      <>
                        <FaRegMoneyBillAlt
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleOpenModal(e);
                          }}
                          color="#14B8A6"
                          size="20px"
                        />
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <BsChevronLeft
          cursor='pointer'
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
      {openFilter && (
        <div className="FilterCom">
          <div className="FilterComTitleD">
            <p className="FilterComTitle">Search</p>
            <AiOutlineCloseCircle
              size="20px"
              style={{ color: "#787d84", cursor: "pointer" }}
              onClick={() => setOpenFilter(false)}
            />
          </div>
          <divider
            style={{
              backgroundColor: "#EBEFF2",
              height: "1px",
              borderWidth: "0px",
              width: "300px",
            }}
          />
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.datePaid}
              onChange={(e) =>
                setFilterCheck({
                  datePaid: !filterCheck.date,
                  dateSold: false,
                  LocationId: false,
                  DealerSalePersonId: false,
                })
              }
            />
            <p className="FilterComText">Date Paid</p>
          </div>
          {filterCheck.datePaid && (
            <>
              <p
                className="REPtype"
                style={{ marginLeft: "15px", color: "black", fontWeight: 700 }}
              >
                From
              </p>
              <div className="FilterComRow">
                <input
                  type="date"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      dateFrom: e.target.value,
                    })
                  }
                  className="PAYselect"
                  style={{ border: "1px solid #D6E4EC", padding: "5px" }}
                />
              </div>
              <p
                className="REPtype"
                style={{ marginLeft: "15px", color: "black", fontWeight: 700 }}
              >
                to
              </p>
              <div className="FilterComRow">
                <input
                  type="date"
                  onChange={(e) =>
                    setFilterValues({ ...filterValues, dateTo: e.target.value })
                  }
                  className="PAYselect"
                  style={{ border: "1px solid #D6E4EC", padding: "5px" }}
                />
              </div>
            </>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.dateSold}
              onChange={(e) =>
                setFilterCheck({
                  dateSold: !filterCheck.dateSold,
                  datePaid: false,
                  LocationId: false,
                  DealerSalePersonId: false,
                })
              }
            />
            <p className="FilterComText">Date Sold</p>
          </div>
          {filterCheck.dateSold && (
            <>
              <p
                className="REPtype"
                style={{ marginLeft: "15px", color: "black", fontWeight: 700 }}
              >
                From
              </p>
              <div className="FilterComRow">
                <input
                  type="date"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      dateFrom1: e.target.value,
                    })
                  }
                  className="PAYselect"
                  style={{ border: "1px solid #D6E4EC", padding: "5px" }}
                />
              </div>
              <p
                className="REPtype"
                style={{ marginLeft: "15px", color: "black", fontWeight: 700 }}
              >
                to
              </p>
              <div className="FilterComRow">
                <input
                  type="date"
                  onChange={(e) =>
                    setFilterValues({
                      ...filterValues,
                      dateTo1: e.target.value,
                    })
                  }
                  className="PAYselect"
                  style={{ border: "1px solid #D6E4EC", padding: "5px" }}
                />
              </div>
            </>
          )}

          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.ClientId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: !filterCheck.ClientId,
                  datePaid: false,
                  dateSold: false,
                  DealerSalePersonId: false,
                })
              }
            />
            <p className="FilterComText">Client Name</p>
          </div>
          {filterCheck.ClientId && (
            <div className="FilterComRow">
              <Select
                options={clients.map((e) => ({ value: e.id, label: e.name }))}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, ClientId: e.value })
                }
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.DealerSalePersonId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  datePaid: false,
                  dateSold: false,
                  DealerSalePersonId: !filterCheck.DealerSalePersonId,
                })
              }
            />
            <p className="FilterComText">Dealer Sale Person</p>
          </div>
          {filterCheck.DealerSalePersonId && (
            <div className="FilterComRow">
              <Select
                options={dealerSalePerson.map((e) => ({
                  value: e.id,
                  label: e.name,
                }))}
                onChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    DealerSalePersonId: e.value,
                  })
                }
                className="PAYselect"
              />
            </div>
          )}

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => filterSubmit(filterValues)}
              className="FilterComButton"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
      <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
        <div
          className="modal"
          style={{ minWidth: "250px", alignItems: "center" }}
        >
          <FaRegMoneyBillAlt
            color="#14B8A6"
            size={"50px"}
            style={{
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />
          <p className="modalText">Type "pay" to confirm </p>
          <input
            className="AQinput"
            onChange={(e) => setModalPay(e.target.value)}
            style={{ marginTop: "12px" }}
          />

          <button
            disabled={modalPay == "pay" ? false : true}
            className="modalButton"
            onClick={handlePayModal}
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default DealerReportComponent;
