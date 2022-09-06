import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import DeletedPaymentsComponent from "../Components/deletedPayment";

const DeletedPayments = () => {
  const userRole = useSelector((state) => state.userRole);
  const clients = useSelector((state) => state.Clients);
  const producers = useSelector((state) => state.Producers);
  const locations = useSelector((state) => state.Locations);
  const [payments, setPayments] = useState([]);
  const [paymentsFil, setPaymentsFil] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [filterValues, setFilterValues] = useState({
    dateFrom: null,
    dateTo: null,
    dateClientId: null,
    ClientTel: null,
    ProducerId: null,
    LocationId: null,
    Method: null,
    Type: null,
  });
  const [filterCheck, setFilterCheck] = useState({
    date: false,
    ClientId: false,
    ClientTel: false,
    ProducerId: false,
    LocationId: false,
    Method: false,
    Type: false,
  });
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const handleDelete = (e) => {
    setDeletedOne(e);
    onOpenModal();
  };
  const handleDeleteModal = (e) => {
    deleteClient({ PaymentId: deletedOne });
    window.location.reload();
  };
  const deleteClient = (data) => {
    data && console.log(data);
    fetch(`https://truewayagentBackend.com/undeletePayment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        try {
          let jsonRes = await res.json();

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
      .get(`https://truewayagentBackend.com/getDeletedPayment`)
      .then(function (response) {
        setPayments(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setPayments]);

  const filterSubmit = (e) => {
    let temp = payments;
    if (e.dateFrom && e.dateTo) {
      temp = temp.filter((h) =>
        moment(`${h.date}`).isBetween(
          `${e.dateFrom}`,
          `${e.dateTo}`,
          undefined,
          "[]"
        )
      );
    }
    if (e.ClientId) {
      temp = temp.filter((h) => h.ClientId == e.ClientId);
    }
    if (e.ClientTel) {
      temp = temp.filter((h) => h.ClientId == e.ClientTel);
    }
    if (e.LocationId) {
      temp = temp.filter((h) => h.LocationId == e.LocationId);
    }
    if (e.ProducerId) {
      temp = temp.filter((h) => h.UserId == e.ProducerId);
    }
    if (e.Type) {
      temp = temp.filter((h) => h.type == e.Type);
    }
    if (e.Method) {
      temp = temp.filter((h) => h.method == e.Method);
    }
    setPaymentsFil(temp);

    setFiltered(true);
  };
  useEffect(() => {
    filterSubmit(filterValues);
  }, [filterValues, payments]);
  const closeCloud = (e) => {
    setFilterValues(e);
  };

  return (
    <DeletedPaymentsComponent
      payments={payments}
      setPayments={setPayments}
      paymentsFil={paymentsFil}
      setPaymentsFil={setPaymentsFil}
      openFilter={openFilter}
      setOpenFilter={setOpenFilter}
      filtered={filtered}
      setFiltered={setFiltered}
      deleteConf={deleteConf}
      setDeleteConf={setDeleteConf}
      deletedOne={deletedOne}
      setDeletedOne={setDeletedOne}
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      userRole={userRole}
      clients={clients}
      producers={producers}
      locations={locations}
      filterCheck={filterCheck}
      setFilterCheck={setFilterCheck}
      open={open}
      setOpen={setOpen}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      deleteClient={deleteClient}
      filterSubmit={filterSubmit}
      closeCloud={closeCloud}
    />
  );
};
export default DeletedPayments;
