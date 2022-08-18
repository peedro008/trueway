import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ManagementLocationComponent from "../Components/managementLocation";
import { GetLocations } from "../Logic/Fetch";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required().email(),
    phone: yup.number().positive().integer().required(),
    address: yup.string().required(),
  })
  .required();

function ManagementLocation() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    data &&
      fetch(` https://truewayagentBackend.com/addLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          try {
            const jsonRes = await res.json();
            GetLocations(dispatch)
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
        
    onOpenModal();
 
  };
  return (
    <ManagementLocationComponent
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      open={open}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      schema={schema}
    />
  );
}

export default ManagementLocation;
