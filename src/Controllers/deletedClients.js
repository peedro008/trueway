import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeletedClientsComponent from "../Components/deletedClients";
function DeletedClients() {
  const [clients, setClients] = useState([]);
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
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/getDeletedClients`)
      .then(function (response) {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDeleteModal = (e) => {
    deleteClient({ ClientId: deletedOne });
    window.location.reload();
  };
  const deleteClient = (data) => {
    data && console.log(data);
    fetch(`https://truewayagentBackend.com/undeleteClient`, {
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

  return (
    <DeletedClientsComponent
      clients={clients}
      setClients={setClients}
      deleteConf={deleteConf}
      setDeleteConf={setDeleteConf}
      deletedOne={deletedOne}
      setDeletedOne={setDeletedOne}
      search={search}
      setSearch={setSearch}
      userRole={userRole}
      open={open}
      setOpen={setOpen}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      deleteClient={deleteClient}
    />
  );
}

export default DeletedClients;
