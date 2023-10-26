import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClientReportComponent from "../Components/clientReport";
import { GetClients, GetClientsId } from "../Logic/Fetch";

function ClientReport() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.Clients);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [search, setSearch] = useState("");
  const userRole = useSelector((state) => state.userRole);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleDelete = (e) => {
    setDeletedOne(e);
    onOpenModal();
  };

  const handleDeleteModal = (e) => {
    deleteClient({ ClientId: deletedOne });
    window.history.go(-1);
  };
  const deleteClient = (data) => {
    data && console.log(data);
    fetch(`https://lantana.truewayagentbackend.com/deleteClient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          GetClients(dispatch);
          GetClientsId(dispatch);
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
  return (
    <ClientReportComponent
      deleteConf={deleteConf}
      deletedOne={deletedOne}
      search={search}
      userRole={userRole}
      open={open}
      setDeleteConf={setDeleteConf}
      setDeletedOne={setDeletedOne}
      setSearch={setSearch}
      clients={clients}
      onCloseModal={onCloseModal}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      deleteClient={deleteClient}
    />
  );
}

export default ClientReport;
