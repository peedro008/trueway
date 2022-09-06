import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProducerReportComponent from "../Components/producersReport";
const ProducerReport = () => {
  const [producers, setProducers] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [sold, setSold] = useState(0);
  const [unSold, setUnSold] = useState(0);
  const [modify, setModify] = useState([]);
  const userRole = useSelector((state) => state.userRole);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleDelete = (e) => {
    setDeletedOne(e);
    onOpenModal();
  };
  const handleDeleteModal = (e) => {
    deleteProducer({ ProducerId: deletedOne });
    window.location.reload();
  };
  const deleteProducer = (data) => {
    data && console.log(data);
    fetch(`https://truewayagentBackend.com/deleteProducer`, {
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
      .get(`https://truewayagentBackend.com/getProducer`)
      .then(function (response) {
        setProducers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/quotes`)
      .then(function (response) {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/getStatus`)
      .then(function (response) {
        setModify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ProducerReportComponent
      producers={producers}
      quotes={quotes}
      deleteConf={deleteConf}
      deletedOne={deletedOne}
      sold={sold}
      unSold={unSold}
      modify={modify}
      onCloseModal={onCloseModal}
      open={open}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      userRole={userRole}
      setDeleteConf={setDeleteConf}
    />
  );
};

export default ProducerReport;
