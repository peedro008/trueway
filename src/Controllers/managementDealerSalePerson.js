import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GetDealerSalePerson } from "../Logic/Fetch";
import ManagementDealerSalePersonComponent from "../Components/managementDealerSalePerson";

const schema = yup
  .object({
    name: yup.string().required(),

   
  })
  .required();

function ManagementDealerSalePerson() {
  const dispatch = useDispatch()


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

  const onSubmit = (data) => {
    data &&
      fetch(`https://truewayagentbackend.com/addDealerSalePerson`, {
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
       
          onOpenModal();
         
        })
        .then(()=>GetDealerSalePerson(dispatch))

        .catch((err) => {
          console.log(err);
        });
  };



  return (
    <ManagementDealerSalePersonComponent
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      open={open}
      control={control}
      
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      schema={schema}
    />
  );
}

export default ManagementDealerSalePerson;
