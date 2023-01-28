import React, { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import SearchField from "react-search-field";
import Modal from "react-responsive-modal";

function ClientReportComponent({
  deleteConf,
  deletedOne,
  search,
  userRole,
  open,
  setDeleteConf,
  setDeletedOne,
  setSearch,
  clients,
  onCloseModal,
  handleDelete,
  handleDeleteModal,
  deleteClient,
}) {
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Client list</p>
      </div>
      <div className="REPcontrol" style={{ maxWidth: "90vw" }}>
        <div className="REPsearch">
          <SearchField
            classNames="pepe"
            placeholder="Search client"
            onChange={setSearch}
          />
        </div>
      </div>
      <table class="table2" style={{ maxWidth: '90vw'}}>
        <tbody>
          <tr>
            <th scope="col" className="column1">
              <p className="REPtype2">Client name</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype2">Client email</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype2">Client phone</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype2">Client company</p>
            </th>
            <th scope="col" className="column1" style={{maxWidth: '200px'}}>
              <p className="REPtype2">Client address</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype2">New</p>
            </th>
            <th scope="col" className="column1" style={{ minWidth: "150px" }}>
              <p className="REPtype2">Notes</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype2">Add payment</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype2">Modify Client</p>
            </th>
            {userRole !== "Producer" && (
              <th scope="col" className="column1">
                <p className="REPtype2">Delete Client</p>
              </th>
            )}
          </tr>
          {!search
            ? clients
                .filter(
                  (e) =>
                    e.Quotes?.filter(
                      (e) =>
                        e.QuoteStatuses[e.QuoteStatuses.length - 1].Status ==
                        "Sold"
                    ).length > 0
                )
                .map((e) => {
                  return (
                    <tr>
                      <td className="ClientName" scope="row">
                        {e.name}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.email}
                      </td>

                      <td className="ClientName" scope="row">
                        {e.tel}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.Company ? e.Company.name : "-"}
                      </td>
                      <td className="ClientName" scope="row" style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: "300px",
                        }}>
                        {e.address ? e.address : "-"}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.new ? "true" : "false"}
                      </td>
                      <td
                        className="ClientName"
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: "100px",
                        }}
                        scope="row"
                      >
                        {e.notes}
                      </td>
                      <td className="ClientName" scope="row">
                        <NavLink
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            color: "black",
                          }}
                          to={{
                            pathname: "/payments/pay",
                            aboutProps: e,
                          }}
                        >
                          <div
                            style={{
                              height: "auto",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="paymentIcon" />
                          </div>
                        </NavLink>
                      </td>

                      <td className="ClientName" scope="row">
                        <NavLink
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            color: "black",
                          }}
                          to={{
                            pathname: "/report/clientedit",
                            aboutProps: e,
                          }}
                        >
                          <div
                            style={{
                              height: "auto",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="editIcon" />
                          </div>
                        </NavLink>
                      </td>
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
            : clients
                ?.filter((e) =>
                  e.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort(function (a, b) {
                  return b.id - a.id;
                })
                .map((e) => {
                  return (
                    <tr>
                      <td className="ClientName" scope="row">
                        {e.name}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.email}
                      </td>

                      <td className="ClientName" scope="row">
                        {e.tel}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.Company ? e.Company.name : "-"}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.address ? e.address : "-"}
                      </td>
                      <td className="ClientName" scope="row">
                        {e.new ? "true" : "false"}
                      </td>
                      <td
                        className="ClientName"
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: "100px",
                        }}
                        scope="row"
                      >
                        {e.notes}
                      </td>
                      <td className="ClientName" scope="row">
                        <NavLink
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            color: "black",
                          }}
                          to={{
                            pathname: "/payments/pay",
                            aboutProps: e,
                          }}
                        >
                          <div
                            style={{
                              height: "auto",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="paymentIcon" />
                          </div>
                        </NavLink>
                      </td>

                      <td className="ClientName" scope="row">
                        <NavLink
                          style={{
                            textDecoration: "none",
                            color: "#000",
                            color: "black",
                          }}
                          to={{
                            pathname: "/report/clientedit",
                            aboutProps: e,
                          }}
                        >
                          <div
                            style={{
                              height: "auto",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <div className="editIcon" />
                          </div>
                        </NavLink>
                      </td>
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
                })}
        </tbody>
      </table>

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
        onClick={() => window.history.go(-1)}
      />

      <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
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
}

export default ClientReportComponent;
//onClick={()=>{handleDelete({ClientId:e.id})}}
