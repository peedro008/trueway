import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DRreportComponent from "../Components/DRreport";
import { useDispatch, useSelector } from "react-redux";
import { getDailyReports } from "../Redux/actions";
const DRreport = () => {
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [paymentsDelete, setPaymentsDelete] = useState(null);
  const [paymentsFil, setPaymentsFil] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [locations, setLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onOpenModal = () => setOpen(true);
  const LocationId = useSelector((state) => state.LocationId);
  const onCloseModal = () => setOpen(false);
  const [filterValues, setFilterValues] = useState({
    dateFrom: null,
    LocationId: null,
  });
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    axios
      .get(`https://lantana.truewayagentbackend.com/getDailyReports`)
      .then(function (response) {
        setPayments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [filterCheck, setFilterCheck] = useState({
    date: false,
    LocationId: false,
  });
  const handleDelete = (e) => {
    setDeletedOne(e[0]);
    setPaymentsDelete(e[1]);
    onOpenModal();
  };
  const handleDeleteModal = (e) => {
    resetDaily({ dailyID: deletedOne, Payments: paymentsDelete });
    // window.location.reload()
  };
  const resetDaily = (e) => {
    let IDs = e.Payments.map((e) => {
      return e.id;
    });
    console.log({ IDs: IDs, dailyID: e.dailyID });
    fetch(`https://lantana.truewayagentbackend.com/resetDailyReport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IDs: IDs,
        dailyID: e.dailyID,
        LocationId: LocationId,
      }),
    });
    getDailyReports(dispatch);
    window.history.go(-1);
  };

  const filterSubmit = (e) => {
    let temp = payments;
    console.log(temp);
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

    if (e.LocationId) {
      temp = temp.filter((h) => h.LocationId == e.LocationId);
    }

    setPaymentsFil(temp);
  };
  useEffect(() => {
    filterSubmit(filterValues);
  }, [filterValues, payments]);
  const closeCloud = (e) => {
    setFilterValues(e);
  };
  return (
    <DRreportComponent
      deleteConf={deleteConf}
      deletedOne={deletedOne}
      paymentsDelete={paymentsDelete}
      paymentsFil={paymentsFil}
      openFilter={openFilter}
      locations={locations}
      open={open}
      filterValues={filterValues}
      filterCheck={filterCheck}
      setDeleteConf={setDeleteConf}
      setDeletedOne={setDeletedOne}
      setPaymentsDelete={setPaymentsDelete}
      setPaymentsFil={setPaymentsFil}
      setOpenFilter={setOpenFilter}
      setLocations={setLocations}
      setOpen={setOpen}
      setFilterValues={setFilterValues}
      setFilterCheck={setFilterCheck}
      onCloseModal={onCloseModal}
      payments={payments}
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      resetDaily={resetDaily}
      filterSubmit={filterSubmit}
      closeCloud={closeCloud}
    />
  );
};
export default DRreport;

{
  /* <PDFDownloadLink style={{textDecoration:"none", color:"black"}} document={<MyDocument data={{payments:e.Payments, producers:producers, date: e.date}}/>} fileName="Receipt"> 
<VscFilePdf className='pdfIcon' size={"20px"} /></PDFDownloadLink></td>        */
}
