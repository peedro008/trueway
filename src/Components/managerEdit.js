import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { BsChevronLeft } from "react-icons/bs";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-responsive-modal";
import Isologo_background from "../assets/Isologo_background.png";
import Icon from "../assets/Icon.png";
import { NavLink } from "react-router-dom";
const schema = yup.object({
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
  const [locations, setLocations] = useState([]);

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
  const reload = () => {
    window.location.reload();
  };
  setValue("UserId", `${Producer.UserId}`);


 
 
  setValue("ProducerId", `${Producer.id}`);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/getLocations`)
      .then(function (response) {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data) => {
    fetch(`http://localhost:8080/modifyManager`, {
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
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Edit Manager</p>
      </div>

      <div className="managerInputsContainer">
        <div className="managerInputsubContainer" style={{ width: "50vw" }}>
          <div className="inputDiv">
            <p className="PAYtitle">Name</p>
            <input
              {...register("name")}
              placeholder="Name"
              onChange={(e) => {
                setInputs({ ...inputs, name: e.target.value });
              }}
              className="AQinput"
              defaultValue={Producer.name}
            ></input>
            <p className="FORMerror">{errors.name?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Email</p>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email",
                },
              })}
              placeholder="Email"
              className="AQinput"
              defaultValue={Producer.email}
            ></input>
            <p className="FORMerror">{errors.email?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Phone</p>
            <input
              {...register("phone")}
              placeholder="Phone"
              onChange={(e) => {
                setInputs({ ...inputs, phone: e.target.value });
              }}
              className="AQinput"
              defaultValue={Producer.phone}
            ></input>
            <p className="FORMerror">
              {errors.phone?.message.substring(0, 25)}
            </p>
          </div>
          
        </div>
        <div className="managerInputsubContainer" style={{ width: "32.5vw" }}>
          <div className="inputDiv">
            <p className="PAYtitle">Password</p>
            <input
              type="password"
              {...register("Password")}
              placeholder="Password"
              className="AQinput"
              
            ></input>
            <p className="FORMerror">{errors.Password?.message}</p>
          </div>
          <div className="inputDiv">
            <p className="PAYtitle">Location</p>
            <Controller
              control={control}
              name="LocationId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  value={options.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                  control={control}
                  options={locations.map((e) => ({
                    value: e.id,
                    label: e.name,
                  }))}
                  name={"LocationId"}
                 
                 
                  
                  className="PAYselect"
                  placeholder="Select Location"
                />
              )}
            />
            <p className="FORMerror">{errors.LocationId?.message}</p>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <button className="PAYbutton" onClick={handleSubmit(onSubmit)}>
          <p className="PAYbuttonText">Submit</p>
        </button>
      </div>
      <Modal open={open} onClose={reload} center classNames={"modal"}>
        <div className="modal">
          <img
            src={Icon}
            style={{
              width: "35px",
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />

          <p className="modalText">Manager modified successfully</p>

          <button onClick={reload} className="modalButton">
            {" "}
            <NavLink
              style={{ textDecoration: "none", color: "#000" }}
              to={"/Manager"}
            >
              Continue
            </NavLink>
          </button>
        </div>
      </Modal>
      <img
        src={Isologo_background}
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          width: "428px",
          opacity: "0.5",
        }}
      />
      <BsChevronLeft
        color="grey"
        style={{
          minWidth: "30px",
          minHeight: "30px",
          position: "fixed",
          zIndex: 9,
          left: "80px",
          top: "17px",
          alignSelf: "flex-start",
        }}
        onClick={() => window.history.go(-2)}
      />
    </div>
  );
};

export default ManagerEdit;

//onChange={event => setInputs({...inputs,down:event.target.value})}
//   return (
//     <div className="genericDiv1">
//       <div className="genericHeader">
//         <p className="genericTitle">Edit Manager</p>
//       </div>

//       <div className="ProdEditContainer">
//         <div className="ProdEditSubContainer1">
//           <p style={{ width: "100%", textAlign: "left" }} className="ProdEditT">
//             Profile
//           </p>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               width: "100%",
//               justifyContent: "space-between",
//             }}
//           >
//             <div className="ProdEditInputCont">
//               <p className="ProdEditTitle">Full name</p>
//               <input
//                 className="ProdEditInput"
//                 placeholder={inputs.name}
//                 {...register("name")}
//               />
//               <p className="FORMerror">{errors.name?.message}</p>
//             </div>
//             <div className="ProdEditInputCont">
//               <p className="ProdEditTitle">Phone number</p>
//               <input
//                 className="ProdEditInput"
//                 placeholder={inputs.phone}
//                 {...register("phone")}
//               />
//               <p className="FORMerror">{errors.phone?.message}</p>
//             </div>
//             <div className="ProdEditInputCont">
//               <p className="ProdEditTitle">Address</p>
//               <input
//                 className="ProdEditInput"
//                 placeholder={inputs.address}
//                 {...register("address")}
//               />
//               <p className="FORMerror">{errors.address?.message}</p>
//             </div>
//             <div className="ProdEditInputCont">
//               <p className="ProdEditTitle">Location</p>
//               <Controller
//                 control={control}
//                 name="LocationId"
//                 render={({ field: { onChange, onBlur, value, ref } }) => (
//                   <Select
//                     styles={customStyles}
//                     value={optionsC.find((c) => c.value === value)}
//                     onChange={(val) => onChange(val.value)}
//                     control={control}
//                     options={locations.map((e) => ({
//                       value: e.id,
//                       label: e.name,
//                     }))}
//                     name={"LocationId"}
//                     className="PAYselect"
//                     placeholder="Select Location"
//                   />
//                 )}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="ProdEditSubContainer">
//           <div style={{ width: "78%", textAlign: "left", marginLeft: "5px" }}>
//             <p className="ProdEditT">Account</p>
//           </div>
//           <div className="ProdEditInputCont">
//             <p className="ProdEditTitle">E-mail</p>
//             <input
//               className="ProdEditInput"
//               placeholder={inputs.email}
//               {...register("email")}
//             />
//             <p className="FORMerror">{errors.email?.message}</p>
//           </div>
//           <div className="ProdEditInputCont">
//             <p className="ProdEditTitle">Password</p>
//             <input
//               placeholder="*******"
//               className="ProdEditInput"
//               {...register("Password")}
//             />
//             <p className="FORMerror">
//               {errors.Password?.message.substring(0, 28)}
//             </p>
//           </div>
//           <div className="ProdEditInputCont">
//             <p className="ProdEditTitle">Repeat password</p>
//             <input
//               placeholder="*******"
//               onChange={(e) => setInputs(e.target.value)}
//               className="ProdEditInput"
//             />
//           </div>
//           <button className="ProdEditSave" onClick={handleSubmit(onSubmit)}>
//             Save
//           </button>

//           <Modal
//             open={open}
//             onClose={() => window.history.go(-2)}
//             center
//             classNames={"modal"}
//           >
//             <div className="modal">
//               <img
//                 src={Icon}
//                 style={{
//                   width: "35px",
//                   alignSelf: "center",
//                   marginTop: "25px",
//                   marginBottom: "10px",
//                 }}
//               />

//               <p className="modalText">Manager modified successfully</p>

//               <button
//                 className="modalButton"
//                 onClick={() => window.history.go(-2)}
//               >
//                 Continue
//               </button>
//             </div>
//           </Modal>
//         </div>
//       </div>

//       <BsChevronLeft
//         color="grey"
//         style={{
//           minWidth: "25px",
//           minHeight: "25px",
//           position: "fixed",
//           zIndex: 9,
//           left: "80px",
//           top: "17px",
//           alignSelf: "flex-start",
//         }}
//         onClick={() => window.history.go(-2)}
//       />
//     </div>
//   );