import axios from "axios";
import React, { useEffect, useState } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import PaymentReportComponent from "../Components/paymentReport";
import { GetPayments } from "../Logic/Fetch";
const PaymentReport = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.userRole);
  const [payments, setPayments] = useState([]);
  const [paymentsFil, setPaymentsFil] = useState([]);
  const [dateF, setDateF] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const producers = useSelector((state) => state.Producers);
  const clients = useSelector((state) => state.Clients);
  const locations = useSelector((state) => state.Locations);
  const [paginator, setPaginator] = useState(1);
  
  const [filterValues, setFilterValues] = useState({
    
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
    // window.location.reload();
  };
  const deleteClient = (data) => {
    data && console.log(data);
    fetch(`https://truewayagentbackend.com/deletePayment`, {
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
            GetPayments(dispatch)
          }
        } catch (err) {
          console.log(err);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(()=>{
    let params = new URLSearchParams();
    params.append("offset", (paginator-1)*20)
    let temp = Object.entries(filterValues)
    
    temp.map(e=>{
      params.append(e[0]=="ProducerId"?"UserId":`${e[0]}`, e[1]);
    });
    axios
      .get(`https://truewayagentbackend.com/getPaymentsReport`, { params })
      .then(function (response) {
        setPayments(response.data);
      })

      .catch((error) => {
        setPayments([]);
        console.log(error);
      });
  },[paginator, filterValues])


  const filterSubmit = (e) => {
 
    setPaymentsFil(payments);

    setFiltered(true);
  };
  useEffect(() => {
    filterSubmit(filterValues);
  }, [filterValues, payments]);
  const closeCloud = () => {
    setFilterValues({});
  };

  return (
  <PaymentReportComponent
    userRole={userRole}
    payments={payments}
    paymentsFil={paymentsFil}
    dateF={dateF}
    openFilter={openFilter}
    filtered={filtered}
    deleteConf={deleteConf}
    deletedOne={deletedOne}
    producers={producers}
    clients={clients}
    locations={locations}
    setPayments={setPayments}
    setPaymentsFil={setPaymentsFil}
    setDateF={setDateF}
    setOpenFilter={setOpenFilter}
    setFiltered={setFiltered}
    setDeleteConf={setDeleteConf}
    setDeletedOne={setDeletedOne}
    filterValues={filterValues}
    setFilterValues={setFilterValues}
    filterCheck={filterCheck}
    setFilterCheck={setFilterCheck}
    open={open}
    onCloseModal={onCloseModal}
    handleDelete={handleDelete}
    handleDeleteModal={handleDeleteModal}
    deleteClient={deleteClient}
    filterSubmit={filterSubmit}
    closeCloud={closeCloud}
    paginator={paginator}
    setPaginator={setPaginator}
  />
  );
};
export default PaymentReport;
