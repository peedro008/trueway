import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ManagerReportComponent from "../Components/managerReport";

const ManagerReport = () => {
  const [managers, setManagers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [sold, setSold] = useState(0);
  const [unSold, setUnSold] = useState(0);
  const [modify, setModify] = useState([]);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const  userRole = useSelector((state) => state.userRole);
  const [open, setOpen] = useState(false);
  const  onOpenModal = () => setOpen(true);
  const  onCloseModal = () => setOpen(false);
  const  handleDelete = (e) => {
    setDeletedOne(e);
    onOpenModal();
  };
  const handleDeleteModal = (e) => {
    deleteManager({ ManagerId: deletedOne });
    window.location.reload();
  };
  const deleteManager = (data) => {
    data && console.log(data);
    fetch(` https://truewayagentBackend.com/deleteManager`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();

          if (res.status !== 200) {
            console.log("error");
          } else {
            console.log(jsonRes);
          }
        } catch (err) {
          console.log(err);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(` https://truewayagentBackend.com/getManager`)
      .then(function (response) {
        setManagers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(` https://truewayagentBackend.com/quotes`)
      .then(function (response) {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(` https://truewayagentBackend.com/getStatus`)
      .then(function (response) {
        setModify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ManagerReportComponent
        managers={managers}
        quotes={quotes}
        sold={sold}
        unSold={unSold}
        modify={modify}
        deleteConf={deleteConf}
        setDeleteConf={setDeleteConf} 
        deletedOne={deletedOne}
        userRole={userRole}
        open={open}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        handleDelete={handleDelete}
        handleDeleteModal={handleDeleteModal}
    />
  );
};

export default ManagerReport;
