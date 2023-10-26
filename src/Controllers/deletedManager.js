import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeletedManagersComponent from "../Components/deletedManager";
import { GetClients, GetClientsId } from "../Logic/Fetch";

const DeletedManagers = () => {
  const dispatch = useDispatch();
  const [managers, setManagers] = useState([]);
  const [sold, setSold] = useState(0);
  const [unSold, setUnSold] = useState(0);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [open, setOpen] = useState(false);
  const modify = useSelector((state) => state.QuoteStatuses);
  const quotes = useSelector((state) => state.Quotes);
  const userRole = useSelector((state) => state.userRole);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleDelete = (e) => {
    setDeletedOne(e);
    onOpenModal();
  };
  const handleDeleteModal = (e) => {
    deleteManager({ ManagerId: deletedOne });
    // window.location.reload();
  };
  const deleteManager = (data) => {
    data && console.log(data);
    fetch(`https://lantana.truewayagentbackend.com/undeleteManager`, {
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
            GetClients(dispatch);
            GetClientsId(dispatch);
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
      .get(`https://lantana.truewayagentbackend.com/getDeletedManager`)
      .then(function (response) {
        setManagers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DeletedManagersComponent
      managers={managers}
      setManagers={setManagers}
      sold={sold}
      setSold={setSold}
      unSold={unSold}
      setUnSold={setUnSold}
      deleteConf={deleteConf}
      setDeleteConf={setDeleteConf}
      deletedOne={deletedOne}
      setDeletedOne={setDeletedOne}
      open={open}
      setOpen={setOpen}
      modify={modify}
      quotes={quotes}
      userRole={userRole}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      deleteManager={deleteManager}
    />
  );
};

export default DeletedManagers;
