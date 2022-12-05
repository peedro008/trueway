import React, {  useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ProducerEditComponent from "../Components/producerEdit";
import { GetProducer } from "../Logic/Fetch";
import { useDispatch, useSelector } from "react-redux";
const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required(),
    address: yup.string().required(),
    Password: yup.string().required(),
    UserId: yup.number().required(),
    ProducerId: yup.number().required(),
    LocationId: yup.number().required(),
  })
  .required();

const ProducerEdit = (props) => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.Locations);
  const Producer = props.location.props;

  const [inputs, setInputs] = useState({});
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
  const reload = () => {
    window.location.reload();
  };

  const onSubmit = (data) => {
    fetch(`https://truewayagentbackend.com//modifyProducer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        try {
          let jsonRes = await res.json();

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
      .then(()=>GetProducer(dispatch))
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
    <ProducerEditComponent
      inputs={inputs}
      setInputs={setInputs}
      open={open}
      locations={locations}
      Producer={Producer}
      setOpen={setOpen}
      onOpenModal={onOpenModal}
      onCloseModal={onCloseModal}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      errors={errors}
      setValue={setValue}
      onSubmit={onSubmit}
      options={options}
      reload={reload}
      customStyles={customStyles}
    />
  );
};

export default ProducerEdit;
