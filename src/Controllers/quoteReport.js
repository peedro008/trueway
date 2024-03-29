import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import QuoteReportComponent from "../Components/quoteReport";

const QuoteReport = (props) => {
  const userRole = useSelector((state) => state.userRole);
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const [deleteConf, setDeleteConf] = useState("");
  const [deletedOne, setDeletedOne] = useState(null);
  const [open1, setOpen1] = useState(false);
  const onCloseModal1 = () => setOpen1(false);
  const [quote, setQuote] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [quotesFil, setQuotesFil] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [paginator, setPaginator] = useState(1);
  const [onlyOne, setOnlyOne] = useState(1);
  const [columns, setColumns] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  useEffect(() => {
    if (props.location.aboutProps?.clientName) {
      setColumns(props.location?.aboutProps);
    } else {
      setFilterValues(props.location?.aboutProps);
      setColumns(defaultC);
    }
  }, []);

  const producers = useSelector((state) => state.Producers);

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
  const categories = useSelector((state) => state.Categories);
  const companies = useSelector((state) => state.Companies);
  const clients = useSelector((state) => state.Clients);
  const dealers = useSelector((state) => state.DealerSalesPersons);
  const locations = useSelector((state) => state.Locations);

  useEffect(() => {
    if (typeof props.location.paginator !== "undefined") {
      console.log(props.location.paginator);
      setPaginator(props.location.paginator);
    }
  }, [props]);

  useEffect(() => {
    let params = new URLSearchParams();
    params.append(
      "offset",
      (typeof props.location.paginator !== "undefined" && onlyOne === 1
        ? props.location.paginator - 1
        : paginator - 1) * 20
    );

    let temp = Object.entries(filterValues || {});

    temp.map((e) => {
      params.append(e[0] == "ProducerId" ? "UserId" : `${e[0]}`, e[1]);
    });
    axios
      .get(`https://lantana.truewayagentbackend.com/getQuotesReport`, {
        params,
      })
      .then(function (response) {
        setOnlyOne(2);
        if (filterValues?.Status === "Quoted") {
          setQuotes(response.data.filter((e) => !e.SoldBy));
        } else {
          setQuotes(response.data);
        }
      })

      .catch((error) => {
        setOnlyOne(2);
        setQuotes([]);
        console.log(error);
      });
  }, [paginator, filterValues]);

  useEffect(() => {
    filterSubmit(filterValues);
  }, [filterValues, quotes]);
  const closeCloud = (e) => {
    let temp = filterValues;
    console.log(temp);
    delete temp[e];
    console.log(temp);

    setFilterValues({});
  };

  const modify = (e) => {
    setQuote(e);
    setOpen(true);
  };
  const filterSubmit = (e) => {
    setQuotesFil(quotes);
  };
  const handleDeleteModal = (e) => {
    deleteClient({ QuoteId: deletedOne });
    window.history.go(-1);
  };
  const deleteClient = (data) => {
    data && console.log(data);
    fetch(`https://lantana.truewayagentbackend.com/deleteQuote`, {
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
  const handleDelete = (e) => {
    setDeletedOne(e);
    setOpen1(true);
  };
  let defaultC = {
    clientName: true,
    clientEmail: true,
    clientTel: true,
    CompanyId: true,
    ProducerId: true,
    down: true,
    monthlyPayment: true,
    dealer: true,
    NSD: true,
    PIP: true,
    MVR: true,
    location: true,
    bound: true,
    notes: true,
    renewDown: true,
    creditCardFee: true,
    category: true,
  };
  return (
    <QuoteReportComponent
      handleDelete={handleDelete}
      handleDeleteModal={handleDeleteModal}
      closeCloud={closeCloud}
      modify={modify}
      categories={categories}
      companies={companies}
      clients={clients}
      dealers={dealers}
      locations={locations}
      filterCheck={filterCheck}
      setFilterCheck={setFilterCheck}
      filterValues={filterValues}
      setFilterValues={setFilterValues}
      userRole={userRole}
      open={open}
      deleteConf={deleteConf}
      open1={open1}
      setDeleteConf={setDeleteConf}
      quote={quote}
      quotes={quotes}
      quotesFil={quotesFil}
      openFilter={openFilter}
      setOpenFilter={setOpenFilter}
      columns={columns ? columns : defaultC}
      onCloseModal={onCloseModal}
      onCloseModal1={onCloseModal1}
      producers={producers}
      paginator={paginator}
      setPaginator={setPaginator}
    />
  );
};
export default QuoteReport;
