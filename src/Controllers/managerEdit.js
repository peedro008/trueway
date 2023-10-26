import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import ManagerEditComponent from "../Components/managerEdit";
import { useDispatch, useSelector } from "react-redux";
import { GetManager } from "../Logic/Fetch";
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    Password: yup.string().required(),
    UserId: yup.number().required(),
    ProducerId: yup.number().required(),
    LocationId: yup.number().required(),
  })
  .required();

const ManagerEdit = (props) => {
  const locations = useSelector((state) => state.Locations);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  let Producer = props.location.props;
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  setValue("UserId", `${Producer.UserId}`);

  setValue("ProducerId", `${Producer.id}`);

  const onSubmit = (data) => {
    fetch(`https://lantana.truewayagentbackend.com/modifyManager`, {
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
            GetManager(dispatch);
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

  const options = locations.map((e) => ({ value: e.id, label: e.name }));
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 30,
      minHeight: 30,
      background: "#F5F5F5",
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

  return (
    <ManagerEditComponent
      options={options}
      customStyles={customStyles}
      onSubmit={onSubmit}
      locations={locations}
      dispatch={dispatch}
      inputs={inputs}
      Producer={Producer}
      setInputs={setInputs}
      setOpen={setOpen}
      open={open}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      setValue={setValue}
    />
  );
};

export default ManagerEdit;
