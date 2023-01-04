import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DeletedProducersComponent from "../Components/deletedProducer";
import { GetProducer } from "../Logic/Fetch";
const DeletedProducers = () => {
  const dispatch = useDispatch()
  const [producers, setProducers] = useState([]);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [sold, setSold] = useState(0);
  const [unSold, setUnSold] = useState(0);
  const [open, setOpen] = useState(false);
  const quotes = useSelector((state) => state.Quotes);
  const modify = useSelector((state) => state.QuoteStatuses);
  const userRole = useSelector((state) => state.userRole);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleDelete = (e) => {
    setDeletedOne(e);
    onOpenModal();
  };
  const handleDeleteModal = (e) => {
    deleteProducer({ ProducerId: deletedOne });
    // window.location.reload();
  };
  const deleteProducer = (data) => {
    data && console.log(data);
    fetch(`http://localhost:8080/undeleteProducer`, {
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
            GetProducer(dispatch)
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
      .get(`http://localhost:8080/getDeletedProducer`)
      .then(function (response) {
        setProducers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DeletedProducersComponent
      producers={producers}
      setProducers={setProducers}
      deleteConf={deleteConf}
      setDeleteConf={setDeleteConf}
      deletedOne={deletedOne}
      setDeletedOne={setDeletedOne}
      sold={sold}
      setSold={setSold}
      unSold={unSold}
      setUnSold={setUnSold}
      open={open}
      setOpen={setOpen}
      quotes={quotes}
      modify={modify}
      userRole={userRole}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      deleteProducer={deleteProducer}
    />
  );
};

export default DeletedProducers;
