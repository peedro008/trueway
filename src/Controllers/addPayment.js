import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import NSDcalculator from "../Logic/NSDcalculator";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddPaymentComponent from "../Components/addPayment";

const schema = yup
  .object({
    name: yup.string().optional().min(6),
    email: yup.string().email().optional().min(6),
    phone: yup.number().optional(),
    ClientId: yup.number().optional().nullable(true),
    amount: yup.string().required(),
    amount2: yup.string().optional().nullable(true),
    type: yup.string().required(),
    method: yup.string().required(),
    creditCardFee: yup.string().optional().default("0"),
    LocationId: yup.number().positive().integer().required(),
    UserId: yup.number().required(),
    new: yup.bool().optional(),
    PIPvalue: yup.string().optional().default("0"),
    NSDamount: yup.string().optional().default("0"),
    MVRvalue: yup.string().optional().default("0"),
    QuoteId: yup.number().optional().nullable(true),
    CategoryId: yup.number().optional(),
    CategoryNsd: yup.number().optional().nullable(false),
    percent: yup.number().optional().nullable(true),
  })
  .required();


function AddPayment(props) {
  const ClientSelected = props.location.aboutProps?.id;
  const clientName = props.location.aboutProps?.name
  const dispatch = useDispatch();
  const [neww, setNeww] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const [method, setMethod] = useState("");
  const [method2, setMethod2] = useState(null);
  const [payment, setPayment] = useState({ creditCardFee: 0 });
  const userId = useSelector((state) => state.UserId);
 
  const [newClient, setNewClient] = useState(false);
  const [form, setForm] = useState({ res: "res" });
  const [inputs, setInputs] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [total, setTotal] = useState(0)
  const [total2, setTotal2] = useState(0)
  const [totalValues, setTotalValues] = useState({})
  const [percent, setPercent] = useState(0)
  const [MultiMethod, setMultiMethod] = useState(false)
  const  categories  = useSelector(state=>state.Categories)
  const  locations  = useSelector(state=>state.Locations)
  const  clients  = useSelector(state=>state.Clients)

  useEffect(() => {
    !method2?

    setTotal(
      (totalValues.amount?parseFloat(totalValues.amount):0)+
    (totalValues.PIPamount?10*parseFloat(totalValues.PIPamount):0)+
    (totalValues.MVRamount?9*parseFloat(totalValues.MVRamount):0)+
    (totalValues.creditCardFee?parseFloat(totalValues.creditCardFee):0)+
    (totalValues.NSDamount?(totalValues.CategoryNsd*totalValues.NSDamount):0))
    :
    setTotal(
      ((totalValues.amount?parseFloat(totalValues.amount):0)+
    (totalValues.PIPamount?10*parseFloat(totalValues.PIPamount):0)+
    (totalValues.MVRamount?9*parseFloat(totalValues.MVRamount):0)+
    (totalValues.creditCardFee?parseFloat(totalValues.creditCardFee):0)+
    (totalValues.NSDamount?(totalValues.CategoryNsd*totalValues.NSDamount):0))*(percent/100))

    setTotal2(
      (
        (totalValues.amount?parseFloat(totalValues.amount):0)+
        (totalValues.PIPamount?10*parseFloat(totalValues.PIPamount):0)+
        (totalValues.MVRamount?9*parseFloat(totalValues.MVRamount):0)+
        (totalValues.creditCardFee?parseFloat(totalValues.creditCardFee):0)+
        (totalValues.NSDamount?(totalValues.CategoryNsd*totalValues.NSDamount):0))
      *(1-(percent/100)))
 
  }, [totalValues, method2])
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 30,
      minHeight: 30,
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        marginTop: "-5px",
      };
    },
    indicatorSeparator: (base) => ({
      ...base,
      height: "0px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      marginTop: "-4px",
    }),
  };
  const reload = () => {
    window.location.reload();
  };
  useEffect(() => {
    setValue("UserId", `${userId}`);
  }, [userId]);

  useEffect(() => {
        if(ClientSelected){
        setForm({...form, client: clientName, id: ClientSelected})
        setValue("ClientId", `${ClientSelected}`)};
      

      
  }, [ClientSelected]);


  useEffect(()=>{
    setValue("percent", `${percent/100}`);
  },[percent])

  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/clientQuotes?client=${form.id}`)
      .then(function (response) {

        setQuotes(response.data)
      
      })
      .catch((error) => {
        setQuotes([])
      });
  }, [form]);
 useEffect(() => {
    setPayment({ ...payment, UserId: userId });
  }, [userId]);

  const temp = () => {
    setNewClient(true);
    setValue("ClientId", null);
    setValue("QuoteId", null);
  };
useEffect(()=>{
  setValue("CategoryNsd", totalValues.CategoryNsd)
  setValue("CategoryId", totalValues.Category)
},[form, totalValues])
const handleNewClient = () => {
  setValue("ClientId", null);
  setNewClient(!newClient);
};
  const optionM = [
    { value: "credit/debit", label: "credit/debit" },
    { value: "EFT", label: "EFT" },
    { value: "Cash", label: "Cash" },

  ];
  const optionT = [
    { value: "Monthly Payment", label: "Monthly Payment" },
    { value: "Down Payment", label: "Down Payment" },
    { value: "Endorsement", label: "Endorsement" },
    { value: "Renew Down", label: "Renew Down" },
    { value: "Full Premium", label: "Full Premium" },
  ];


  const onSubmit = (data) => {


    if(!MultiMethod){
      if (newClient == false) {
        fetch(`https://truewayagentBackend.com/addPayment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => onOpenModal());
      } else {
        fetch(`https://truewayagentBackend.com/addClientPayment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        onOpenModal();
      }
  }
  else{
    if (newClient == false) {
      fetch(`https://truewayagentBackend.com/addMultiPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => onOpenModal());
    } else {
      fetch(`https://truewayagentBackend.com/ClientMultiPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      onOpenModal();
    }
  }
  
  
  };
  const optionsCa = categories?.map((e) => ({ value: e.id, label: e.name, NSD:e.NSDvalue}));
  const optionsC = clients?.map((e) => ({ value: e.id, label: e.name }));
  const optionsL = locations?.map((e) => ({ value: e.id, label: e.name }));
  const optionsQ = quotes?.map((e) => ({ value: e.id, label: `${e.id}  |  ${e.Category.name}  |  ${e.date}`, Category:e.Category.id, NSD:e.Category.NSDvalue}));
  
  return <AddPaymentComponent 
    onOpenModal={onOpenModal}

    open={open}
    optionsCa={optionsCa}
    categories={categories}
    optionsC={optionsC}
    clients={clients}
    optionsL={optionsL}
    locations={locations}
    optionsQ={optionsQ}
    optionT={optionT}
    optionM={optionM}
    quotes={quotes}
    control={control}
    handleSubmit={handleSubmit}
    onSubmit={onSubmit}
    register={register}
    errors={errors}
    schema={schema}  
    handleNewClient={handleNewClient}
    customStyles={customStyles}
    neww={neww}
    setNeww={setNeww}
    method={method}
    setMethod={setMethod}
    inputs={inputs}
    setInputs={setInputs}
    form={form}
    setForm={setForm}
    payment={payment}
    newClient={newClient}
    ClientSelected={ClientSelected}
    reload={reload}
    total={total}
setTotal={setTotal}
totalValues={totalValues}
setTotalValues={setTotalValues}
setValue={setValue}
MultiMethod={MultiMethod}
setMultiMethod={setMultiMethod}
total2={total2}
setTotal2={setTotal2}
percent={percent}
setPercent={setPercent}
method2={method2}
setMethod2={setMethod2}
  />
 
}

export default AddPayment;
