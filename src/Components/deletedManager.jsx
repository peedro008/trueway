import React from "react";


import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";



import {FiRefreshCcw} from "react-icons/fi"
import Modal from "react-responsive-modal";

const DeletedManagersComponent = ({
    managers,
setManagers,
sold,
setSold,
unSold,
setUnSold,
deleteConf,
setDeleteConf,
deletedOne,
setDeletedOne,
open,
setOpen,
modify,
quotes,
userRole,
onOpenModal,
onCloseModal,
handleDelete,
handleDeleteModal,
deleteManager,
}) => {
  
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Manager</p>
      </div>

      <div
        style={{
          paddingLeft: "60px",
          paddingTop: "20px",
          paddingBottom: "8px",
        }}
      >
        <p className="PRsubtitle">Manager list</p>
      </div>

      <div>
        {/* <NavLink to="/managerP">
            <button style={{width:40, height:40, alignContent:"center", display:"flex"}}>+</button>
        </NavLink> */}
      </div>

      <div style={{ paddingLeft: "60px" }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <p className="tableTitle">Name</p>{" "}
              </th>
              <th scope="col">
                <p className="tableTitle">E-mail</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Phone</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Sold quotes</p>
              </th>
              <th scope="col">
                <p className="tableTitle">Unsold quotes</p>
              </th>
              {userRole !== "Producer" && (
                <th scope="col" className="column1">
                  <p style={{color: "#FFFFFF"}} className="REPtype">Reset</p>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {managers.map((e) => {
              return (
                <tr>
                  <td scope="row">
                    {
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "#000",
                          color: "black",
                        }}
                        to={{
                          pathname: "/users/manager/details",
                          aboutProps: e,
                        }}
                      >
                        {e.name}
                      </NavLink>
                    }
                  </td>

                  <td scope="row">{e.email}</td>
                  <td scope="row">{e.phone}</td>
                  <td scope="row">
                    {
                      modify.filter(
                        (f) =>
                          f.UserId == e.UserId &&
                          f.Status !== "Quoted" &&
                          f.Status !== "Cancelled"
                      ).length
                    }
                  </td>
                  <td scope="row">
                    {
                      quotes
                        .filter((f) => f.UserId == e.UserId)
                        .filter(
                          (g) =>
                            g.QuoteStatuses.sort(function (a, b) {
                              return a.id - b.id;
                            }).reverse()[0].Status == "Cancelled" ||
                            g.QuoteStatuses.sort(function (a, b) {
                              return a.id - b.id;
                            }).reverse()[0].Status == "Quoted"
                        ).length
                    }
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
      </div>
      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      ></div>
      <BsChevronLeft
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
};

export default DeletedManagersComponent;
