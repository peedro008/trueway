import React, {  useState } from "react";
import "../Css/css.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


import { useDispatch, useSelector } from "react-redux";
import ManagementCompanyComponent from "../Components/managementCompany";
import { GetCompany } from "../Logic/Fetch";

const schema = yup
  .object({
    name: yup.string().required(),
    CategoryId: yup.number().required(),
  })
  .required();

const ManagerCompany = () => {
  const dispatch = useDispatch()
  const  Categories  = useSelector(state=>state.Categories)
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
 
  const onSubmit = (data) => {
    data && console.log(JSON.stringify(data));
    fetch(`https://truewayagentbackend.com//addCompany`, {
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
            GetCompany(dispatch)
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
  const options = Categories.map((e) => ({ value: e.id, label: e.name }));
  return(
      <ManagementCompanyComponent
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        open={open}
        options={options}
        categories={Categories}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        schema={schema}
        />
  )
};

export default ManagerCompany