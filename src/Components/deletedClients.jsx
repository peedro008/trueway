import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import SearchField from "react-search-field";
import Modal from "react-responsive-modal";
import { FiRefreshCcw } from "react-icons/fi";

function DeletedClientsComponent({
  clients,
  setClients,
  deleteConf,
  setDeleteConf,
  deletedOne,
  setDeletedOne,
  search,
  setSearch,
  userRole,
  open,
  setOpen,
  onOpenModal,
  onCloseModal,
  handleDelete,
  handleDeleteModal,
  deleteClient,
}) {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Deleted Client list</p>
      </div>
      <div className="REPcontrol">
        <div className="REPsearch">
          <SearchField
            classNames="pepe"
            placeholder="Search item"
            onChange={setSearch}
          />
        </div>
      </div>
      <table class="table2" style={{ minWidth: "80vw" }}>
        <tbody>
          <tr>
            <th scope="col" className="column1">
              <p className="REPtype">Client name</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Client email</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Client phone</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">New</p>
            </th>
            <th scope="col" className="column1">
              <p className="REPtype">Notes</p>
            </th>

            {userRole !== "Producer" && (
              <th scope="col" className="column1">
                <p className="REPtype">Reset Client</p>
              </th>
            )}
          </tr>
          {!search
            ? clients
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
                            <FiRefreshCcw
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
                .filter((e) =>
                  e.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort(function (a, b) {
                  return b.id - a.id;
                })
                .map((e) => {
                  return (
                    <tr>
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
                          {e.name}
                        </NavLink>
                      </td>
                      <td className="ClientName" scope="row">
                        {" "}
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
                          {e.email}
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
                          {e.tel}
                        </NavLink>
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
                            aboutProps: e.id,
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
                            <FiRefreshCcw
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

      <Modal open={open} onClose={onCloseModal} center classNames={"modal"}>
        <div
          className="modal"
          style={{ minWidth: "250px", alignItems: "center" }}
        >
          <FiRefreshCcw
            color="#14B8A6"
            size={"50px"}
            style={{
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />
          <p className="modalText">Type "reset" to confirm </p>
          <input
            className="AQinput"
            onChange={(e) => setDeleteConf(e.target.value)}
            style={{ marginTop: "12px" }}
          />

          <button
            disabled={deleteConf == "reset" ? false : true}
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

export default DeletedClientsComponent;
