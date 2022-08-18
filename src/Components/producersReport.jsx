import React from "react";
import { MdAdd } from "react-icons/md";
import { BsChevronLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import "../Css/css.css";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "react-responsive-modal";
const ProducerReportComponent = ({
  producers,
  quotes,
  deleteConf,
  deletedOne,
  sold,
  unSold,
  modify,
  onCloseModal,
  open,
  handleDelete,
  handleDeleteModal,
  userRole,
  setDeleteConf,
}) => {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Producer</p>
      </div>

      <div
        style={{
          paddingLeft: "60px",
          paddingTop: "20px",
          paddingBottom: "8px",
        }}
      >
        <p className="PRsubtitle">Producer list</p>
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
                  <p style={{ color: "#FFFF" }} className="REPtype">
                    Delete Producer
                  </p>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {producers.map((e) => {
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
                          pathname:
                            e.User.UserRole == "Manager"
                              ? "/users/Manager/details"
                              : "/users/producers/details",
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
                      quotes.filter(
                        (f) => f.UserId == e.UserId && f.QuoteStatuses.sort(function (a, b) {
                          return b.id - a.id;
                        })[0].Status == "Sold"
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
                              return b.id - a.id;
                            })[0].Status == "Quoted"
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
      </div>
      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <NavLink
          to="/management/Producer"
          style={{ textDecoration: "none", color: "#000" }}
        >
          <button className="PAYbutton">
            <MdAdd color="white" size={"20px"} className="PAYbuttonIcon" />
            <p className="PAYbuttonText">New Producer</p>
          </button>
        </NavLink>
      </div>
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

export default ProducerReportComponent;
