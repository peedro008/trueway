import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";

import { useSelector } from "react-redux";
import DeletedQuotesComponent from "../Components/deletedQuotes";
const DeletedQuote = (props) => {
  const producers = useSelector((state) => state.Producers);
  const companies = useSelector((state) => state.Companies);
  const categories = useSelector((state) => state.Categories);
  const userRole = useSelector((state) => state.userRole);
  const clients = useSelector((state) => state.Clients);
  const dealers = useSelector((state) => state.DealerSalesPersons);
  const locations = useSelector((state) => state.Locations);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [open1, setOpen1] = useState(false);
  const onOpenModal1 = () => setOpen1(false);
  const onCloseModal1 = () => setOpen1(false);
  const [quote, setQuote] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [quotesFil, setQuotesFil] = useState([]);
  const [pes, setPes] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  let columns = props.location.aboutProps;

  const [filterValues, setFilterValues] = useState({
    dateFrom: null,
    dateTo: null,
    ClientId: null,
    ClientTel: null,
    SoldBy: null,
    ProducerId: null,
    LocationId: null,
    CompanyId: null,
    CategoryId: null,
    Status: null,
    DealerId: null,
  });
  const [filterCheck, setFilterCheck] = useState({
    date: false,
    ClientId: false,
    ClientTel: false,
    SoldBy: false,
    ProducerId: false,
    LocationId: false,
    CompanyId: false,
    CategoryId: false,
    Status: false,
    DealerId: false,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getdeletedquotes`)
      .then(function (response) {
        setQuotes(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [setQuotes]);
  useEffect(() => {
    filterSubmit(filterValues);
  }, [filterValues, quotes]);
  const closeCloud = (e) => {
    setFilterValues(e);
  };

  const filterSubmit = (e) => {
    let temp = quotes;
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
    if (e.CompanyId) {
      temp = temp.filter((h) => h.CompanyId == e.CompanyId);
    }
    if (e.CategoryId) {
      temp = temp.filter((h) => h.CategoryId == e.CategoryId);
    }
    if (e.SoldBy) {
      temp = temp.filter(
        (h) =>
          h.QuoteStatuses.sort(function (a, b) {
            return b.id - a.id;
          })[0].User.name == e.SoldBy
      );
    }
    if (e.Status) {
      temp = temp.filter(
        (h) =>
          h.QuoteStatuses.sort(function (a, b) {
            return b.id - a.id;
          })[0].Status == e.Status
      );
    }
    if (e.ProducerId) {
      temp = temp.filter((h) => h.UserId == e.ProducerId);
    }
    if (e.DealerId) {
      temp = temp.filter((h) => h.DealerId == e.DealerId);
    }
    setQuotesFil(temp);
  };
  const handleDeleteModal = (e) => {
    deleteClient({ QuoteId: deletedOne });
    window.history.go(-1);
  };
  const deleteClient = (data) => {
    data && console.log(data);
    fetch(`http://localhost:8080/undeleteQuote`, {
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
  const handleDelete = (e) => {
    setDeletedOne(e);
    setOpen1(true);
  };
  return (
    <DeletedQuotesComponent
      producers={producers}
      companies={companies}
      categories={categories}
      userRole={userRole}
      clients={clients}
      dealers={dealers}
      locations={locations}
      deleteConf={deleteConf}
      setDeleteConf={setDeleteConf}
      deletedOne={deletedOne}
      setDeletedOne={setDeletedOne}
      open1={open1}
      setOpen1={setOpen1}
      onOpenModal1={onOpenModal1}
      onCloseModal1={onCloseModal1}
      quote={quote}
      quotes={quotes}
      quotesFil={quotesFil}
      pes={pes}
      openFilter={openFilter}
      columns={columns}
      setQuote={setQuote}
      setQuotes={setQuotes}
      setQuotesFil={setQuotesFil}
      setPes={setPes}
      setOpenFilter={setOpenFilter}
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      filterCheck={filterCheck}
      setFilterCheck={setFilterCheck}
      filterSubmit={filterSubmit}
      handleDeleteModal={handleDeleteModal}
      deleteClient={deleteClient}
      handleDelete={handleDelete}
      closeCloud={closeCloud}
    />
  );
};
export default DeletedQuote;
