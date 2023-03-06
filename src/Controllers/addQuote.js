import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddQuoteComponent from "../Components/addQuote";
import { GetA_AVG, GetClients, GetClientsId } from "../Logic/Fetch";
import { useHistory } from "react-router-dom";

const schema = yup
  .object({
    LocationId: yup.number().required(),
    CategoryId: yup.number().required(),
    ClientId: yup.number().optional().nullable(true),
    CompanyId: yup.number().required(),
    UserId: yup.number().required(),
    DealerSalePersonId: yup.number().optional().nullable().default(null),
    down: yup.string().required(),
    monthlyPayment: yup.string().optional(),
    NSDamount: yup.string().optional().default("0"),
    Bound: yup.bool().required(),
    PIPamount: yup.string().optional().default("0"),
    TotalPremium: yup.string().optional().default("0"),
    MVRamount: yup.string().optional().default("0"),
    name: yup.string().optional().min(1),
    email: yup.string().optional().email().min(1),
    tel: yup.string().optional().nullable().default(null).min(6),
    new: yup.bool().optional(),
    CategoryNsd: yup.number().optional().nullable(false),
    address: yup.string().optional().nullable().default(null),
    date: yup.string().optional().nullable().default(null),
  })
  .required();

const AddQuote = () => {
  const dispatch = useDispatch();
  const [neww, setNeww] = useState(false);
  const [open, setOpen] = useState(false);
  const [quoteStatus, setQuoteStatus] = useState("");
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const User = useSelector((state) => state.User);
  const [newClient, setNewClient] = useState(false);
  const [inputs, setInputs] = useState({ Bound: false });
  const [CategoAux, setCategoAux] = useState(false);
  const [show, setShow] = useState(true);
  const [ERR, setERR] = useState({ ClientId: false });
  const [addingQuote, setAddingQuote] = useState(false);
  const [dealerData, setDealerData] = useState({
    ClientId: null,
    DealerSalePersonId: null,
    amount: 0,
    paid: false,
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 5,
  });
  const history = useHistory();
  const categories = useSelector((state) => state.Categories);
  const companies = useSelector((state) => state.Companies);
  const clients = useSelector((state) => state.Clients);
  const dealers = useSelector((state) => state.DealerSalesPersons);
  const locations = useSelector((state) => state.Locations);

  const date = new Date();
  const DATE =
    date.getFullYear() +
    (date.getMonth() + 1 > 9 ? "-" : "-0") +
    (date.getMonth() + 1) +
    "-" +
    date.getDate();
  useEffect(() => {
    setValue("UserId", parseInt(User.userId));
    setValue("date", DATE);
  }, []);

  const reload = () => {
    history.push("/report/filter");
  };

  const onSubmit = (data) => {
    setAddingQuote(true);
    (!data.PIPamount || data.PIPamount == "") && setValue("PIPamount", "0");
    (!data.NSDamount || data.NSDamount) == "" && setValue("NSDamount", "0");
    (!data.MVRamount || data.MVRamount == "") && setValue("MVRamount", "0");

    !data.Bound && setValue("Bound", false);
    !data.totalPremium ||
      (data.totalPremium == "" && setValue("totalPremium", "0"));
    !data.monthlyPayments ||
      (data.monthlyPayments == "" && setValue("monthlyPayment", "0"));
    setValue("Bound", `${inputs.Bound}`);

    fetch(`https://truewayagentbackend.com/addQuote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json();
        handleDealer(data.ClientId);
        onOpenModal();
        setQuoteStatus("Quote added successfully");
        GetClients(dispatch);
        GetClientsId(dispatch);
        GetA_AVG(dispatch);
        setAddingQuote(false);
      })
      .catch(() => {
        setQuoteStatus("Quote could not be added");
        setAddingQuote(false);
      });
  };
  const handleDealer = (x = null) => {
    inputs.DealerSalePerson && !x
      ? fetch(`https://truewayagentbackend.com/addDealer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dealerData),
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
          })
      : fetch(`https://truewayagentbackend.com/addDealer`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ClientId: x,
            DealerSalePersonId: dealerData.DealerSalePersonId,
            amount: dealerData.amount,
            paid: dealerData.paid,
          }),
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
  const handleNewClient = () => {
    setValue("ClientId", null);
    setValue("email", null);
    setValue("name", null);
    setValue("phone", null);
    setValue("address", null);
    setNewClient(!newClient);
  };

  const optionsCa = categories?.map((e) => ({
    value: e.id,
    label: e.name,
    NSD: e.NSDvalue,
  }));
  const optionsCo = companies?.map((e) => ({ value: e.id, label: e.name }));
  const optionsL = locations?.map((e) => ({ value: e.id, label: e.name }));
  const optionsD = dealers?.map((e) => ({ value: e.id, label: e.name }));
  const optionsC = clients?.map((e) => ({ value: e.id, label: e.name }));

  return (
    <AddQuoteComponent
      onSubmit={onSubmit}
      handleNewClient={handleNewClient}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      reload={reload}
      optionsCa={optionsCa}
      optionsCo={optionsCo}
      optionsL={optionsL}
      optionsD={optionsD}
      optionsC={optionsC}
      neww={neww}
      open={open}
      setNeww={setNeww}
      setOpen={setOpen}
      onCloseModal={onCloseModal}
      newClient={newClient}
      setNewClient={setNewClient}
      inputs={inputs}
      ERR={ERR}
      setInputs={setInputs}
      categories={categories}
      companies={companies}
      clients={clients}
      dealers={dealers}
      locations={locations}
      dealerData={dealerData}
      setValue={setValue}
      setDealerData={setDealerData}
      CategoAux={CategoAux}
      setCategoAux={setCategoAux}
      show={show}
      setShow={setShow}
      quoteStatus={quoteStatus}
      addingQuote={addingQuote}
    />
  );
};

export default AddQuote;
