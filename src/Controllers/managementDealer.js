import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ManagementDealerComponent from "../Components/managementDealer";
import { GetDealers } from "../Logic/Fetch";

const schema = yup
  .object({
    ClientId: yup.number().required(),
    DealerSalePersonId: yup.number().required(),
    amount: yup.string().required(),
    paid: yup.bool().required().default(false),
  })
  .required();

const ManagementDealer = () => {
  const dispatch = useDispatch();
  const [neww, setNeww] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [inputs, setinputs] = useState({});
  const Clients = useSelector((state) => state.Clients);
  const DealerSalesPersons = useSelector((state) => state.DealerSalesPersons);
  const reload = () => {
    // window.location.reload();
  };
  const onSubmit = (data) => {
    data &&
      fetch(`https://truewayagentbackend.com/addDealer`, {
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
              GetDealers(dispatch);
            }
          } catch (err) {
            console.log(err);
          }
          onOpenModal();
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const optionsC = Clients.map((e) => ({ value: e.id, label: e.name }));
  const optionsD = DealerSalesPersons?.map((e) => ({
    value: e.id,
    label: e.name,
  }));
  return (
    <ManagementDealerComponent
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      open={open}
      control={control}
      client={Clients}
      dealerSalePerson={DealerSalesPersons}
      optionsC={optionsC}
      optionsD={optionsD}
      reload={reload}
      inputs={inputs}
      setInputs={setinputs}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      schema={schema}
      neww={neww}
      setNeww={setNeww}
    />
  );
};
export default ManagementDealer;
