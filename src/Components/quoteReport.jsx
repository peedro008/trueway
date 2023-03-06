import React from "react";
import "../Css/css.css";

import { NavLink } from "react-router-dom";
import ModifyModal from "../Controllers/modifyModal";
import { BsChevronLeft, BsInfoCircle } from "react-icons/bs";

import Select from "react-select";
import close from "../assets/close.svg";

import {
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineFilter,
  AiOutlineEdit,
} from "react-icons/ai";

import Modal from "react-responsive-modal";
import spinnerr from "../assets/spinnerr.gif";
import { useSelector } from "react-redux";
const QuoteReportComponent = ({
  handleDelete,
  handleDeleteModal,
  closeCloud,
  modify,
  categories,
  companies,
  clients,
  dealers,
  locations,
  filterCheck,
  setFilterCheck,
  filterValues,
  setFilterValues,
  userRole,
  open,
  deleteConf,
  open1,
  setDeleteConf,
  quote,
  quotes,
  quotesFil,
  openFilter,
  setOpenFilter,
  columns,
  onCloseModal,
  onCloseModal1,
  producers,
  paginator,
  setPaginator,
}) => {
  const users = useSelector((e) => e.Users);
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Quote reports</p>
      </div>
      <div className="REPcontrol">
        <div className="REPDate">
          {filterValues?.dateFrom && filterValues?.dateTo && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                From:&nbsp;<strong>{filterValues.dateFrom}</strong>
              </p>
              <p className="cloudFilterText" style={{ marginLeft: "5px" }}>
                To:&nbsp;<strong>{filterValues?.dateTo}</strong>
              </p>

              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("dateFrom");
                  closeCloud("dateTo");
                }}
              />
            </div>
          )}
          {filterValues?.ClientId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Client name:
                {clients.find((c) => c.id == filterValues?.ClientId).name}
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("ClientId");
                }}
              />
            </div>
          )}

          {filterValues?.SoldBy && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Sold By:
                {
                  producers.find((c) => c.User.id == filterValues?.ProducerId)
                    ?.User.name
                }
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("SoldBy");
                }}
              />
            </div>
          )}
          {filterValues?.UserId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Producer name:
                {
                  producers.find((c) => c.User.id == filterValues?.ProducerId)
                    ?.User.name
                }
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("UserId");
                }}
              />
            </div>
          )}
          {filterValues?.LocationId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Location:
                {locations.find((c) => c.id == filterValues?.LocationId)?.name}
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("LocationId");
                }}
              />
            </div>
          )}
          {filterValues?.CompanyId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Company:
                {companies.find((c) => c.id == filterValues?.CompanyId)?.name}
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("CompanyId");
                }}
              />
            </div>
          )}
          {filterValues?.CategoryId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Category:
                {categories.find((c) => c.id == filterValues?.CategoryId)?.name}
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("CategoryId");
                }}
              />
            </div>
          )}
          {filterValues?.Status && (
            <div className="cloudFilter">
              <p className="cloudFilterText">Status:{filterValues?.Status}</p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("Status");
                }}
              />
            </div>
          )}
          {filterValues?.DealerSalePersonId && (
            <div className="cloudFilter">
              <p className="cloudFilterText">
                Location:
                {dealers?.find((c) => c.id == filterValues?.DealerId)?.name}
              </p>
              <img
                src={close}
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  closeCloud("DealerId");
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          cursor: "pointer",
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
      <table class="table1">
        <tbody>
          <tr>
            <th scope="col" className="column1">
              <p className="REPtype2">Edit</p>
            </th>
            {columns.clientName && (
              <th scope="col" className="column1">
                <p className="REPtype2">Client name</p>
              </th>
            )}
            {columns.clientEmail && (
              <th scope="col" className="column1">
                <p className="REPtype2">Client E-mail</p>
              </th>
            )}
            {columns.clienTel && (
              <th scope="col" className="column1">
                <p className="REPtype2">Client phone</p>
              </th>
            )}
            {columns.category && (
              <th scope="col" className="column1">
                <p className="REPtype2">Category</p>
              </th>
            )}
            {columns.CompanyId && (
              <th scope="col" className="column1">
                <p className="REPtype2">Company</p>
              </th>
            )}
            {columns.ProducerId && (
              <th scope="col" className="column1">
                <p className="REPtype2">Producer</p>
              </th>
            )}
            {
              <th scope="col" className="column1">
                <p className="REPtype2">Sold By</p>
              </th>
            }
            <th scope="col" className="column1">
              <p className="REPtype2">Total</p>
            </th>
            {columns.bound && (
              <th scope="col" className="column1">
                <p className="REPtype2">Status</p>
              </th>
            )}
            {
              <th scope="col" className="column1">
                <p className="REPtype2">Date</p>
              </th>
            }
            {
              <th scope="col" className="column1">
                <p className="REPtype2">Closing date</p>
              </th>
            }
            {
              <th scope="col" className="column1">
                <p className="REPtype2">Time</p>
              </th>
            }
            {columns.down && (
              <th scope="col" className="column1">
                <p className="REPtype2">Down Payments</p>
              </th>
            )}
            {columns.monthlyPayment && (
              <th scope="col" className="column1">
                <p className="REPtype2">Monthly Payments</p>
              </th>
            )}
            {columns.dealer && (
              <th scope="col" className="column1">
                <p className="REPtype2">Dealer Name</p>
              </th>
            )}
            {columns.NSD && (
              <th scope="col" className="column1">
                <p className="REPtype2">NSD</p>
              </th>
            )}
            {columns.PIP && (
              <th scope="col" className="column1">
                <p className="REPtype2">PIP</p>
              </th>
            )}
            {columns.MVR && (
              <th scope="col" className="column1">
                <p className="REPtype2">MVR</p>
              </th>
            )}
            {columns.location && (
              <th scope="col" className="column1">
                <p className="REPtype2">Location</p>
              </th>
            )}
            {userRole !== "Producer" && (
              <th scope="col" className="column1">
                <p className="REPtype2">Delete Quote</p>
              </th>
            )}
          </tr>

          {!quotesFil ? (
            <img
              src={spinnerr}
              style={{
                width: "200px",
                position: "absolute",
                right: "45vw",
                top: "45vh",
              }}
            />
          ) : (
            quotesFil
              .sort(function (a, b) {
                return b.id - a.id;
              })
              .map((e) => {
                return (
                  <tr>
                    {/* <td className="ClientName" scope="row">
                      <NavLink
                        style={{ textDecoration: "none", color: "#000" }}
                        to={{
                          pathname: "/report/quote",
                          aboutProps: { ID: e.id },
                        }}
                      >
                        <div className="InfoIcon2">
                        <BsInfoCircle size={'25px'} color={'#54B4D3'}/>
                        </div>
                      </NavLink>
                    </td> */}
                    <td className="ClientName" scope="row">
                      <div className="InfoIcon2" onClick={() => modify(e)}>
                        <AiOutlineEdit size={"26px"} color={"#14A44D"} />
                      </div>
                    </td>
                    {columns.clientName && (
                      <td className="ClientName" scope="row">
                        <NavLink
                          style={{ textDecoration: "none", color: "#000" }}
                          to={{
                            pathname: "/report/clientedit",
                            aboutProps: e.Client,
                            paginator: paginator,
                          }}
                        >
                          {e.Client.name}
                        </NavLink>
                      </td>
                    )}
                    {columns.clientEmail && (
                      <td className="row1" scope="row">
                        {e.Client.email}
                      </td>
                    )}
                    {columns.clienTel && (
                      <td className="row1" scope="row">
                        {e.Client.tel}
                      </td>
                    )}
                    {columns.category && (
                      <td className="row1" scope="row">
                        {e.Category.name}
                      </td>
                    )}
                    {columns.CompanyId && (
                      <td className="row1" scope="row">
                        {e.Company.name}
                      </td>
                    )}
                    {columns.ProducerId && (
                      <td className="row1" scope="row">
                        {e.User.name}
                      </td>
                    )}
                    {
                      <td className="row1" scope="row">
                        {users.find((f) => f.id == e.SoldBy)?.name}
                      </td>
                    }
                    <td className="row1" scope="row">
                      ${" "}
                      {(
                        (e.down ? parseFloat(e.down) : 0) +
                        (e.PIPvalue ? parseFloat(e.PIPvalue) : 0) +
                        (e.NSDvalue ? parseFloat(e.NSDvalue) : 0) +
                        (parseFloat(e.MVRvalue) ? parseFloat(e.MVRvalue) : 0) +
                        (e.creditCardFee ? parseFloat(e.creditCardFee) : 0)
                      ).toFixed(2)}
                    </td>
                    {columns.bound && (
                      <td className="row1" scope="row">
                        {
                          e.QuoteStatuses?.sort(function (a, b) {
                            return b.id - a.id;
                          })[0]?.Status
                        }
                      </td>
                    )}
                    <td className="row1" scope="row">
                      {e.date}
                    </td>
                    <td className="row1" scope="row">
                      {e.closingDate}
                    </td>
                    <td className="row1" scope="row">
                      {e.time?.substring(11, 16)}
                    </td>
                    {columns.down && (
                      <td className="row1" scope="row">
                        ${e.down}
                      </td>
                    )}
                    {columns.monthlyPayment && (
                      <td className="row1" scope="row">
                        ${e.monthlyPayment}
                      </td>
                    )}
                    {columns.dealer && (
                      <td className="row1" scope="row">
                        {e.Dealer ? e.Dealer.name : "false"}
                      </td>
                    )}
                    {columns.NSD && (
                      <td className="row1" scope="row">
                        ${e.NSDvalue}
                      </td>
                    )}
                    {columns.PIP && (
                      <td className="row1" scope="row">
                        ${e.PIPvalue}
                      </td>
                    )}
                    {columns.MVR && (
                      <td className="row1" scope="row">
                        ${e.MVRvalue}
                      </td>
                    )}
                    {columns.location && (
                      <td className="row1" scope="row">
                        {e.Location.name}
                      </td>
                    )}
                    {userRole !== "Producer" && (
                      <td className="ClientName" scope="row">
                        <div
                          style={{
                            height: "auto",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AiOutlineDelete
                            color="#DC4C64"
                            className="deleteIcon"
                            size={"20px"}
                            onClick={() => {
                              handleDelete(e.id);
                            }}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
          )}
        </tbody>
      </table>
      <div className="PaginatorBox">
        <div
          className="PaginatorLeft"
          onClick={() => {
            paginator !== 1 && setPaginator(paginator - 1);
          }}
        >
          <AiOutlineLeft color="white" size={"20px"} />
        </div>
        <div className="PaginatorNum">{paginator}</div>
        <div
          className="PaginatorRight"
          onClick={() => {
            setPaginator(paginator + 1);
          }}
        >
          <AiOutlineRight color="white" size={"20px"} />
        </div>
      </div>
      <NavLink
        to={{
          pathname: "/report",
        }}
      >
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
        />
      </NavLink>

      {open && (
        <ModifyModal
          open={open}
          onCloseModal={onCloseModal}
          quoteM={quote}
          paginator={paginator}
        />
      )}

      {openFilter && (
        <div className="FilterCom">
          <div className="FilterComTitleD">
            <p className="FilterComTitle">Filter</p>
            <AiOutlineCloseCircle
              size="20px"
              style={{ color: "#2b4162", cursor: "pointer" }}
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
              checked={filterCheck.date}
              onChange={(e) =>
                setFilterCheck({
                  date: !filterCheck.date,
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  LocationId: false,
                  CompanyId: false,
                  DealerId: false,
                  CategoryId: false,
                  Status: false,
                })
              }
            />
            <p className="FilterComText">Date</p>
          </div>
          {filterCheck.date && (
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
              checked={filterCheck.ClientId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: !filterCheck.ClientId,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  LocationId: false,
                  CompanyId: false,
                  DealerId: false,
                  CategoryId: false,
                  Status: false,
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
              checked={filterCheck.SoldBy}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: !filterCheck.SoldBy,
                  ProducerId: false,
                  LocationId: false,
                  DealerId: false,
                  CompanyId: false,
                  CategoryId: false,
                  Status: false,
                })
              }
            />
            <p className="FilterComText">Sold by</p>
          </div>
          {filterCheck.SoldBy && (
            <div className="FilterComRow">
              <Select
                options={producers.map((e) => ({
                  value: e.User.id,
                  label: e.name,
                }))}
                onChange={(e) =>
                  setFilterValues({
                    ...filterValues,
                    UserId: e.value,
                    Status: "Sold",
                  })
                }
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.ProducerId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: !filterCheck.ProducerId,
                  LocationId: false,
                  CompanyId: false,
                  DealerId: false,
                  CategoryId: false,
                  Status: false,
                })
              }
            />
            <p className="FilterComText">Producer Name</p>
          </div>
          {filterCheck.ProducerId && (
            <div className="FilterComRow">
              <Select
                options={producers.map((e) => ({
                  value: e.UserId,
                  label: e.name,
                }))}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, UserId: e.value })
                }
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.LocationId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  LocationId: !filterCheck.LocationId,
                  CompanyId: false,
                  CategoryId: false,
                  DealerId: false,
                  Status: false,
                })
              }
            />
            <p className="FilterComText">Location</p>
          </div>
          {filterCheck.LocationId && (
            <div className="FilterComRow">
              <Select
                options={locations.map((e) => ({ value: e.id, label: e.name }))}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, LocationId: e.value })
                }
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.CompanyId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  DealerId: false,
                  LocationId: false,
                  CompanyId: !filterCheck.CompanyId,
                  CategoryId: false,
                  Status: false,
                })
              }
            />
            <p className="FilterComText">Company</p>
          </div>
          {filterCheck.CompanyId && (
            <div className="FilterComRow">
              <Select
                options={companies.map((e) => ({ value: e.id, label: e.name }))}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, CompanyId: e.value })
                }
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.CategoryId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  LocationId: false,
                  DealerId: false,
                  CompanyId: false,
                  CategoryId: !filterCheck.CategoryId,
                  Status: false,
                })
              }
            />
            <p className="FilterComText">Category</p>
          </div>
          {filterCheck.CategoryId && (
            <div className="FilterComRow">
              <Select
                options={categories.map((e) => ({
                  value: e.id,
                  label: e.name,
                }))}
                onChange={(e) =>
                  setFilterValues({ ...filterValues, CategoryId: e.value })
                }
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow">
            <input
              type={"checkbox"}
              checked={filterCheck.Status}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  LocationId: false,
                  CompanyId: false,
                  CategoryId: false,
                  DealerId: false,
                  Status: !filterCheck.Status,
                })
              }
            />
            <p className="FilterComText">Status</p>
          </div>
          {filterCheck.Status && (
            <div className="FilterComRow">
              <Select
                options={[
                  { value: "Sold", label: "Sold" },
                  { value: "Renew down", label: "Renew down" },
                  { value: "Cancelled", label: "Cancelled" },
                  { value: "Re-install", label: "Re-install" },
                  { value: "Quoted", label: "Quoted" },
                ]}
                onChange={(e) => {
                  if (e.value === "Quoted") {
                    setFilterValues({
                      ...filterValues,
                      Status: e.value,
                    });
                  } else {
                    setFilterValues({ ...filterValues, Status: e.value });
                  }
                }}
                className="PAYselect"
              />
            </div>
          )}
          <div className="FilterComRow" style={{ width: "220px" }}>
            <input
              type={"checkbox"}
              checked={filterCheck.DealerId}
              onChange={(e) =>
                setFilterCheck({
                  ClientId: false,
                  ClientTel: false,
                  SoldBy: false,
                  ProducerId: false,
                  LocationId: false,
                  CompanyId: false,
                  CategoryId: false,
                  Status: false,
                  DealerId: !filterCheck.DealerId,
                })
              }
            />
            <p className="FilterComText">Dealer sale person</p>
          </div>
          {filterCheck.DealerId && (
            <div className="FilterComRow">
              <Select
                options={dealers?.map((e) => ({ value: e.id, label: e.name }))}
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
        </div>
      )}

      <Modal open={open1} onClose={onCloseModal1} center classNames={"modal"}>
        <div
          className="modal"
          style={{ minWidth: "250px", alignItems: "center" }}
        >
          <AiOutlineDelete
            color="#FF4545"
            size={"50px"}
            style={{
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />
          <p className="modalText">Type "delete" to confirm </p>
          <input
            className="AQinput"
            onChange={(e) => setDeleteConf(e.target.value)}
            style={{ marginTop: "12px" }}
          />

          <button
            disabled={deleteConf == "delete" ? false : true}
            className="modalButton"
            onClick={handleDeleteModal}
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default QuoteReportComponent;
