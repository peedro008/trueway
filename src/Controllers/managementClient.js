import React, { useEffect, useState } from "react";
import "../Css/css.css";



import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import ManagementClientComponent from "../Components/managementClient";
import { GetClients } from "../Logic/Fetch";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    tel: yup.number().positive().integer().required(),
    new: yup.bool().required(),
    notes: yup.string().optional().default(""),
    dateOfBirth: yup.string().optional().default(""),
    address: yup.string().optional().default(""),
    CompanyId: yup.number().required(),
  })
  .required();

const ManagementClient = () => {
  const dispatch = useDispatch()
  const Companies = useSelector((state) => state.Companies);
  const [open, setOpen] = useState(false);
  const [neww, setNeww] = useState(false);
  const [address, setAddress] = useState("");
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const onSubmit = (data) => {
    data && console.log(JSON.stringify(data));
    fetch(` https://truewayagentBackend.com/addClient`, {
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
            GetClients(dispatch)
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
  useEffect(() => {
    setValue("address", `${address}`);
  }, [address]);

  const options = Companies.map((e) => ({ value: e.id, label: e.name }));

  return (
    <ManagementClientComponent
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      open={open}
      options={options}
      Companies={Companies}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      schema={schema}
      neww={neww}
      setNeww={setNeww}
      address={address}
      setAddress={setAddress}
    />
  );
};
export default ManagementClient;
