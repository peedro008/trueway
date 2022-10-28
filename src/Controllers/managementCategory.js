import React, { useState } from "react";
import "../Css/css.css";
import "react-responsive-modal/styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ManagerCategoryComponent from "../Components/managementCategory";
import { GetCategories } from "../Logic/Fetch";
import { useDispatch } from "react-redux";

const schema = yup
  .object({
    name: yup.string().required(),
    NSDvalue: yup.number().required(),
  })
  .required();

const ManagerCategory = () => {
  const dispatch = useDispatch()
  const [inputs, setinputs] = useState({});
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
      fetch(`https://truewayAgentbackend.com/addCategories`, {
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
              GetCategories(dispatch)
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
  return (
    <ManagerCategoryComponent
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
};
export default ManagerCategory;
