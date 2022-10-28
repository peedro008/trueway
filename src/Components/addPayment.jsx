import React, { useEffect, useState } from "react";

import "../Css/css.css";

import { BiMessageSquareAdd } from "react-icons/bi";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import { Controller } from "react-hook-form";

import { FiDivide } from "react-icons/fi";
import { BsChevronLeft } from "react-icons/bs";

function AddPaymentComponent({
  onOpenModal,

  open,
  optionsCa,
  categories,
  optionsC,
  clients,
  optionsL,
  locations,
  optionsQ,
  optionT,
  t1,
setT1,
t2,
setT2,
  optionM,
  quotes,
  control,
  handleSubmit,
  onSubmit,
  setValue,
  register,
  errors,
  schema,
  handleNewClient,
  customStyles,
  neww,
  setNeww,
  method,
  setMethod,
  inputs,
  setInputs,
  form,
  setForm,
  payment,
  newClient,
  ClientSelected,
  reload,
  total,
  setTotal,
  totalValues,
  setTotalValues,
  MultiMethod,
  setMultiMethod,
method2,
  setMethod2,
total2,
setTotal2,
percent,
  setPercent,
}) {
  return (
    <div className="genericDiv1">
      <div className="genericHeader">
        <p className="genericTitle">Add payment</p>
      </div>

      <div className="PAYMainBox">
        <div className="PAYBox">
          <div className="PAYInputCont" style={{ marginTop: "25px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p className="PAYtitle">Client Name</p>
              <BiMessageSquareAdd
                onClick={() => handleNewClient()}
                size="20"
                color="#28C76F"
                style={{ marginLeft: "70px", cursor: "pointer" }}
              />
            </div>
            {!newClient ? (
              <>
                <Controller
                  control={control}
                  name="ClientId"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                      defaultValue={optionsC?.find(
                        (c) => c.value === ClientSelected
                      )}
                      value={optionsC?.find((c) => c.value === ClientSelected)}
                      onChange={(val) => {
                        onChange(val.value);
                        setForm({ ...form, client: val.label, id: val.value });
                      }}
                      control={control}
                      options={clients?.map((e) => ({
                        value: e.id,
                        label: e.name,
                      }))}
                      name={"ClientId"}
                      className="PAYselect"
                    />
                  )}
                />
              </>
            ) : (
              <>
                <input className="PAYsub-title" {...register("name")} />
                <p className="FORMerror">{errors.name?.message}</p>
              </>
            )}
          </div>
          {newClient ? (
            <div className="PAYBox" style={{ paddingTop: "25px" }}>
              <div className="PAYInputCont">
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
                  className="PAYsub-title"
                ></input>
                <p className="FORMerror">{errors.email?.message}</p>
              </div>
              <div className="PAYInputCont">
                <p className="PAYtitle">Phone</p>
                <input
                  {...register("phone")}
                  placeholder="Phone"
                  className="PAYsub-title"
                ></input>
                <p className="FORMerror">
                  {errors.phone?.message.substring(0, 25)}
                </p>
              </div>

              {newClient && (
                <>
                  <div className="AQinputContainer">
                    <p className="AQinputName">Category</p>
                    <div className="AQyesNoContainer">
                      <div>
                        <Controller
                          control={control}
                          name="CategoryId"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <Select
                              value={optionsCa?.find((c) => c.value === value)}
                              onChange={(val) => {
                                onChange(val.value);
                                setTotalValues({
                                  ...totalValues,
                                  Category: val.value,
                                  CategoryNsd: optionsCa.find(
                                    (c) => c.value === val.value
                                  ).NSD,
                                });
                              }}
                              control={control}
                              options={categories?.map((e) => ({
                                value: e.id,
                                label: e.name,
                              }))}
                              name={"CategoryId"}
                              className="PAYselect"
                              placeholder="Select Category"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="AQinputContainer"
                    style={{ marginLeft: "50px" }}
                  >
                    <p className="AQinputName">New client</p>
                    <div className="AQyesNoContainer">
                      <div>
                        <input
                          className="AQcheckInput"
                          type="checkbox"
                          checked={neww}
                          name="new"
                          {...register("new")}
                          onChange={(event) => setNeww(!neww)}
                        />
                        {neww ? (
                          <p className="AQyesNoText">Yes</p>
                        ) : (
                          <p className="AQyesNoText">No</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="PAYInputCont" style={{ marginTop: "25px" }}>
                <p className="PAYtitle">Quote</p>
                <Controller
                  control={control}
                  name="QuoteId"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select
                      isDisabled={form.client ? false : true}
                      value={optionsQ?.find((c) => c.value === value)}
                      onChange={(val) => {
                        onChange(val.value);
                        setForm({
                          ...form,
                          aa: val.value,
                          Category: val.Category,
                          NSDcategory: val.NSD,
                        });
                        setTotalValues({
                          ...totalValues,
                          Category: val.Category,
                          CategoryNsd: optionsCa.find(
                            (c) => c.value === val.Category
                          ).NSD,
                        });
                      }}
                      control={control}
                      options={optionsQ}
                      name={"QuoteId"}
                      className="PAYselectQ"
                      placeholder="Select Quote"
                    />
                  )}
                />

                <p className="FORMerror">{errors.LocationId?.message}</p>
              </div>
              <div className="AQinputContainer" style={{ marginTop: "29px" }}>
                <p className="AQinputName">Category</p>
                <div className="AQyesNoContainer">
                  <div>
                    <Controller
                      control={control}
                      name="CategoryId"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          defaultValue={optionsCa.find(
                            (c) => c.value === form.Category
                          )}
                          value={optionsCa.find((c) => c.value === value)}
                          onChange={(val) => {
                            onChange(val.value);
                            setValue(
                              "CategoryNsd",
                              optionsCa.filter((c) => c.value === val.value)[0]
                                .NSD
                            );
                            setTotalValues({
                              ...totalValues,
                              Category: val.value,
                              CategoryNsd: optionsCa.filter(
                                (c) => c.value === val.value
                              )[0].NSD,
                            });
                          }}
                          control={control}
                          options={categories.map((e) => ({
                            value: e.id,
                            label: e.name,
                          }))}
                          name={"CategoryId"}
                          className="PAYselect"
                          placeholder="Select Category"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="PAYBox" style={{ marginTop: "25px" }}>
          <div className="PAYInputCont">
            <p className="PAYtitle">Location</p>
            <Controller
              control={control}
              name="LocationId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  value={optionsL.find((c) => c.value === value)}
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

          <div className="PAYInputCont">
            <p className="PAYtitle">Amount</p>
            <input
              placeholder="Amount"
              className="AQinput"
              value={payment.amount}
              {...register("amount")}
              onChange={(e) => {
                setTotalValues({ ...totalValues, amount: e.target.value });
              }}
            />
            <p className="FORMerror">{errors.amount?.message}</p>
          </div>

          <div className="PAYInputCont">
            <p className="PAYtitle">Payment type</p>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  value={optionT.find((c) => c.value === value)}
                  onChange={(val) => onChange(val.value)}
                  control={control}
                  options={optionT.map((e) => ({
                    value: e.value,
                    label: e.label,
                  }))}
                  name={"type"}
                  className="PAYselect"
                  placeholder="Select method"
                />
              )}
            />
            <p className="FORMerror">{errors.type?.message}</p>
          </div>
          {!MultiMethod ? (
            <div className="PAYInputCont">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p className="PAYtitle">Payment Method</p>
                <FiDivide
                  size="20"
                  color="#2b4162"
                  style={{ cursor: "pointer" }}
                  onClick={() => setMultiMethod(!MultiMethod)}
                />
              </div>
              <Controller
                control={control}
                name="method"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={optionM.find((c) => c.value === value)}
                    onChange={(val) => {
                      onChange(val.value);
                      setMethod(val.value);
                    }}
                    control={control}
                    options={optionM.map((e) => ({
                      value: e.value,
                      label: e.label,
                    }))}
                    name={"method"}
                    className="PAYselect"
                    placeholder="Select method"
                  />
                )}
              />

              <p className="FORMerror">{errors.method?.message}</p>
            </div>
          ) : (
            <></>
          )}
          {method == "credit/debit" && (
            <div className="PAYInputCont">
              <p className="PAYtitle">Credit card fee</p>
              <input
                className="AQinput"
                {...register("creditCardFee")}
                onChange={(e) => {
                  setTotalValues({
                    ...totalValues,
                    creditCardFee: e.target.value,
                  });
                }}
              />
              <p className="FORMerror">{errors.creditCardFee?.message}</p>
            </div>
          )}
        </div>
      
        <div className="AQwhiteContainer11">
          <div className="AQinputContainer">
            <p className="AQinputName">NSD</p>
            <div className="AQyesNoContainer">
              <div>
                <input
                  className="AQcheckInput"
                  type="checkbox"
                  checked={inputs.NSD}
                  value={inputs.NSD}
                  disabled={totalValues.Category ? false : true}
                  key="NSD"
                  name="NSD"
                  onChange={(event) => {
                    setInputs({ ...inputs, NSD: !inputs.NSD });
                  }}
                />
                {inputs.NSD ? (
                  <p className="AQyesNoText">Yes</p>
                ) : (
                  <p className="AQyesNoText">No</p>
                )}
              </div>
              {inputs.NSD && (
                <>
                  <input
                    className="AQinput2"
                    placeholder="How much?"
                    key="NSDamount"
                    name="NSDamount"
                    defaultValue={0}
                    value={inputs.NSDamount}
                    {...register("NSDamount")}
                    onChange={(e) =>
                      setTotalValues({
                        ...totalValues,
                        NSDamount: parseFloat(e.target.value),
                      })
                    }
                  />
                  <p className="FORMerror">{errors.NSDamount?.message}</p>
                  <p className="FORMerror">{errors.ClientId?.message}</p>
                </>
              )}
            </div>
          </div>

          <div className="AQinputContainer">
            <p className="AQinputName">MVR</p>
            <div className="AQyesNoContainer">
              <div>
                <input
                  className="AQcheckInput"
                  type="checkbox"
                  checked={inputs.MVR}
                  key="MVR"
                  name="MVR"
                  onChange={(event) =>
                    setInputs({ ...inputs, MVR: !inputs.MVR })
                  }
                />
                {inputs.MVR ? (
                  <p className="AQyesNoText">Yes</p>
                ) : (
                  <p className="AQyesNoText">No</p>
                )}
              </div>
              {inputs.MVR && (
                <>
                  <input
                    className="AQinput2"
                    placeholder="How much"
                    key="MVRamount"
                    name="MVRamount"
                    defaultValue={0}
                    value={inputs.MVRamount}
                    {...register("MVRamount")}
                    onChange={(e) => {
                      setTotalValues({
                        ...totalValues,
                        MVRamount: parseFloat(e.target.value),
                      });
                    }}
                  />
                  <p className="FORMerror">{errors.NSDamount?.message}</p>{" "}
                </>
              )}
            </div>
          </div>

          <div className="AQinputContainer1">
            <p className="AQinputName">PIP</p>
            <div className="AQyesNoContainer">
              <div>
                <input
                  className="AQcheckInput"
                  type="checkbox"
                  checked={inputs.PIP}
                  value={inputs.PIP}
                  key="PIP"
                  name="PIP"
                  onChange={(event) =>
                    setInputs({ ...inputs, PIP: !inputs.PIP })
                  }
                />
                {inputs.PIP ? (
                  <p className="AQyesNoText">Yes</p>
                ) : (
                  <p className="AQyesNoText">No</p>
                )}
              </div>
              {inputs.PIP && (
                <>
                  <input
                    className="AQinput2"
                    placeholder="PIP value"
                    defaultValue={0}
                    key="dealerSalePerson"
                    name="dealerSalePerson"
                    {...register("PIPamount")}
                    onChange={(e) => {
                      setTotalValues({
                        ...totalValues,
                        PIPamount: parseFloat(e.target.value),
                      });
                    }}
                  />
                  <p className="FORMerror">{errors.NSDamount?.message}</p>
                </>
              )}
            </div>
          </div>
        </div>
        {MultiMethod ? (
          <div className="PAYBox" style={{ marginTop: "25px" }}>
            <div className="PAYInputCont">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p className="PAYtitle">1° method</p>
                <FiDivide
                  size="20"
                  color="#2b4162"
                  style={{ cursor: "pointer" }}
                  onClick={() => setMultiMethod(!MultiMethod)}
                />
              </div>
              <Controller
                control={control}
                name="method"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={optionM.find((c) => c.value === value)}
                    onChange={(val) => {
                      onChange(val.value);
                      setMethod(val.value);
                    }}
                    control={control}
                    options={optionM.map((e) => ({
                      value: e.value,
                      label: e.label,
                    }))}
                    name={"method"}
                    className="PAYselect"
                    placeholder="Select method"
                  />
                )}
              />

              <p className="FORMerror">{errors.method?.message}</p>
            </div>
            <div className="PAYInputCont">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "center",
                  
               
                }}
              >
                <p className="PAYtitle" style={{textAlign:"center"}}>Amount</p>
              </div><input
                    className="AQinput2"
                    placeholder="$$$"
                    key="NSDamount"
                    name="NSDamount"
                   
                    onChange={(e)=>setT1(e.target.value)}
                   style={{maxWidth:"50px",}}
                  />
              
              </div>
            <div className="PAYInputCont">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p className="PAYtitle">2° method</p>
              </div>
              <Controller
                control={control}
                name="method2"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={optionM.find((c) => c.value === value)}
                    onChange={(val) => {
                      onChange(val.value);
                      setMethod2(val.value);
                    }}
                    control={control}
                    options={optionM.map((e) => ({
                      value: e.value,
                      label: e.label,
                    }))}
                    name={"method2"}
                    className="PAYselect"
                    placeholder="Select 2° method"
                  />
                )}
              />

              <p className="FORMerror">{errors.method?.message}</p>
            </div>
            <div className="PAYInputCont">
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "center",
                  
               
                }}
              >
                <p className="PAYtitle" style={{textAlign:"center"}}>Amount</p>
              </div><input
                    className="AQinput2"
                    placeholder="$$$"
                    key="NSDamount"
                    name="NSDamount"
                    value={t2}
                    disabled={true}
                   style={{maxWidth:"50px",}}
                  />
              
              </div>
          </div>
        ) : (
          <></>
        )}

        <div className="DEPtotal1">
          <p className="DEPtotalT">TOTAL $ {total ? total.toFixed(2) : 0}</p>
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

            <p className="modalText">Payment added successfully</p>

            <button className="modalButton" onClick={reload}>
              Continue
            </button>
          </div>
        </Modal>

        <BsChevronLeft
          color="grey"
          style={{
            minWidth: "25px",
            minHeight: "25px",
            position: "fixed",
            zIndex: 9,
            left: "80px",
            top: "17px",
            alignSelf: "flex-start",
          }}
          onClick={() => window.history.go(-1)}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: "50px",
          top: "76px",
          display: "flex",
        }}
      >
        <button onClick={handleSubmit(onSubmit)} className="PAYbutton">
          <p className="PAYbuttonText">Add payment</p>
        </button>
      </div>
    </div>
  );
}

export default AddPaymentComponent;
