import React, { useEffect, useState } from "react";

import "../Css/css.css";
import spinnerr from "../assets/loadingIcon.gif";
import { BiMessageSquareAdd } from "react-icons/bi";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import ErrorIcon from "../assets/cross-mark.png";
import { Controller } from "react-hook-form";

import { FiDivide } from "react-icons/fi";
import { BsChevronLeft } from "react-icons/bs";

function AddPaymentComponent({
  onOpenModal,
  optionsComp,
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
  clientsId,
  addingPayment,
  paymentStatus,
}) {
  const [colorButtom, setColorButtom] = useState(true);
  const [isEndorsement, setIsEndorsement] = useState("");
  console.log(form);
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
                onClick={() => {
                  handleNewClient();
                  setColorButtom(!colorButtom);
                }}
                size="20"
                color={colorButtom ? "#28C76F" : "#DC4C64"}
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
                      // onKeyDown={(val) => {
                      //   if (
                      //     val.key === "a" ||
                      //     val.key === "q" ||
                      //     val.key === "z" ||
                      //     val.key === "x" ||
                      //     val.key === "s" ||
                      //     val.key === "w" ||
                      //     val.key === "e" ||
                      //     val.key === "d" ||
                      //     val.key === "c" ||
                      //     val.key === "v" ||
                      //     val.key === "f" ||
                      //     val.key === "r" ||
                      //     val.key === "t" ||
                      //     val.key === "g" ||
                      //     val.key === "b" ||
                      //     val.key === "n" ||
                      //     val.key === "h" ||
                      //     val.key === "y" ||
                      //     val.key === "u" ||
                      //     val.key === "j" ||
                      //     val.key === "m" ||
                      //     val.key === "i" ||
                      //     val.key === "k" ||
                      //     val.key === "l" ||
                      //     val.key === "o" ||
                      //     val.key === "p" ||
                      //     val.key === "ñ" ||
                      //     val.key === " " ||
                      //     val.key === "2"
                      //   ) {
                      //     setClienteByName(clienteByName + val.key);
                      //   } else if (val.key === 'Backspace') {
                      //     setClienteByName(clienteByName.substr(0, clienteByName - 1))
                      //   }
                      //   // console.log(val.key)
                      // }}
                      control={control}
                      options={clientsId}
                      name={"ClientId"}
                      className="PAYselect"
                    />
                  )}
                />
              </>
            ) : (
              <>
                <input
                  className="PAYsub-title"
                  {...register("name")}
                  placeholder="Name"
                />
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
                                  CategoryNsd: optionsCa?.find(
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
                    style={{ marginLeft: "30px" }}
                  >
                    <p className="AQinputName">Company</p>
                    <div className="AQyesNoContainer">
                      <div>
                        <Controller
                          control={control}
                          name="CompanyId"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <Select
                              defaultValue={optionsComp?.find(
                                (c) => c.value === form.Company
                              )}
                              value={optionsComp.find((c) => c.value === value)}
                              onChange={(val) => {
                                onChange(val.value);
                                setTotalValues({
                                  ...totalValues,
                                  CompanyId: val.value,
                                });
                              }}
                              control={control}
                              options={optionsComp}
                              name={"Company"}
                              className="PAYselect"
                              placeholder="Select Company"
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
              <div
                className="PAYInputCont"
                style={{ marginTop: "25px", marginRight: "53px" }}
              >
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
                          Company: val.CompanyId,
                          NSDcategory: val.NSD,
                          totalPremium: val.totalPremium,
                          LocationId: val.LocationId,
                          policyNumber: val.policyNumber,
                          effectiveDate: val.effectiveDate,
                          expirationDate: val.expirationDate,
                        });
                        setValue(
                          "LocationId",
                          val.LocationId,
                          "policyNumber",
                          val.policyNumber,
                          "effectiveDate",
                          val.effectiveDate,
                          "expirationDate",
                          val.expirationDate
                        );

                        setTotalValues({
                          ...totalValues,
                          Category: val.Category,
                          CompanyId: val.CompanyId,
                          CategoryNsd: optionsCa.find(
                            (c) => c.value === val.Category
                          ).NSD,
                          policyNumber: val.policyNumber,
                          effectiveDate: val.effectiveDate,
                          expirationDate: val.expirationDate,
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
              </div>

              <div
                className="AQinputContainer"
                style={{ marginTop: "29px", marginRight: "50px" }}
              >
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
              {!form.Company && (
                <div className="AQinputContainer" style={{ marginTop: "29px" }}>
                  <p className="AQinputName">Company</p>
                  <div className="AQyesNoContainer">
                    <div>
                      <Controller
                        control={control}
                        name="CompanyId"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Select
                            defaultValue={optionsComp?.find(
                              (c) => c.value === form.Company
                            )}
                            value={optionsComp.find((c) => c.value === value)}
                            onChange={(val) => {
                              onChange(val.value);
                              setTotalValues({
                                ...totalValues,
                                CompanyId: val.value,
                              });
                            }}
                            control={control}
                            options={optionsComp}
                            name={"Company"}
                            className="PAYselect"
                            placeholder="Select Company"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
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
                  defaultValue={optionsL.find(
                    (c) => c.value === form.LocationId
                  )}
                  value={optionsL.find((c) => c.value === value)}
                  onChange={(val) => {
                    onChange(val.value);
                    setTotalValues({
                      ...totalValues,
                      LocationId: val.value,
                    });
                  }}
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
                  onChange={(val) => {
                    onChange(val.value);
                    setIsEndorsement(val.value);
                  }}
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
          {isEndorsement === "Endorsement" && (
            <div className="PAYInputCont">
              <p className="PAYtitle">Additional premium</p>
              <input
                placeholder="Add to Premium"
                className="AQinput"
                type="number"
                defaultValue={0}
                value={payment?.increasePremium}
                {...register("increasePremium")}
                onChange={(e) => {
                  setTotalValues({
                    ...totalValues,
                    increasePremium: e.target.value,
                  });
                }}
              />
            </div>
          )}
          {(isEndorsement === "Renew Down" ||
            isEndorsement === "Down Payment" ||
            isEndorsement === "Full Premium") && (
            <div className="PAYInputCont">
              <p className="PAYtitle">Total premium</p>
              <input
                placeholder="Add to Premium"
                className="AQinput"
                type="number"
                defaultValue={form.totalPremium || 0}
                value={payment?.increasePremium}
                {...register("increasePremium")}
                onChange={(e) => {
                  setTotalValues({
                    ...totalValues,
                    increasePremium: e.target.value,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="PAYBox" style={{ marginTop: "25px" }}>
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

          {(isEndorsement === "Renew Down" ||
            isEndorsement === "Down Payment" ||
            isEndorsement === "Full Premium" ||
            isEndorsement === "Endorsement") && (
            <>
              <div
                className="PAYInputCont"
                style={{ marginTop: "-13px", marginRight: "0px" }}
              >
                <p
                  className="PAYtitle"
                  style={{ width: "245px", fontSize: "15px" }}
                >
                  Policy number for New Policies, Endorsments, Renewals ONLY.
                </p>
                <input
                  placeholder="Policy Number"
                  className="AQinput"
                  defaultValue={form.policyNumber || ""}
                  value={payment?.policyNumber}
                  {...register("policyNumber")}
                  onChange={(e) => {
                    setTotalValues({
                      ...totalValues,
                      policyNumber: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="PAYInputCont">
                <p className="PAYtitle">Effective Date</p>
                <input
                  type={"date"}
                  placeholder="Effective Date"
                  className="AQinput"
                  defaultValue={form.effectiveDate}
                  value={payment?.effectiveDate}
                  {...register("effectiveDate")}
                  onChange={(e) => {
                    setTotalValues({
                      ...totalValues,
                      effectiveDate: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="PAYInputCont">
                <p className="PAYtitle">Expiration Date</p>
                <input
                  type={"date"}
                  placeholder="Expiration Date"
                  className="AQinput"
                  defaultValue={form.expirationDate}
                  value={payment?.expirationDate}
                  {...register("expirationDate")}
                  onChange={(e) => {
                    setTotalValues({
                      ...totalValues,
                      expirationDate: e.target.value,
                    });
                  }}
                />
              </div>
            </>
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
                    type="number"
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
                <p className="PAYtitle" style={{ textAlign: "center" }}>
                  Amount
                </p>
              </div>
              <input
                className="AQinput2"
                placeholder="$$$"
                key="NSDamount"
                name="NSDamount"
                onChange={(e) => setT1(e.target.value)}
                style={{ maxWidth: "50px" }}
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
                <p className="PAYtitle" style={{ textAlign: "center" }}>
                  Amount
                </p>
              </div>
              <input
                className="AQinput2"
                placeholder="$$$"
                key="NSDamount"
                name="NSDamount"
                value={t2}
                disabled={true}
                style={{ maxWidth: "50px" }}
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
              src={
                paymentStatus === "Payment added successfully"
                  ? Icon
                  : ErrorIcon
              }
              style={{
                width: "35px",
                alignSelf: "center",
                marginTop: "25px",
                marginBottom: "10px",
              }}
            />

            <p className="modalText">{paymentStatus}</p>

            <button className="modalButton" onClick={reload}>
              Continue
            </button>
          </div>
        </Modal>

        <BsChevronLeft
          cursor="pointer"
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
        <button
          onClick={handleSubmit(onSubmit)}
          className={addingPayment ? "PAYbuttonPayWaiting" : "PAYbuttonPay"}
        >
          <p className="PAYbuttonText">Add payment</p>
        </button>
      </div>
      {addingPayment && (
        <div style={{ position: "absolute", bottom: "25px", right: "25px" }}>
          <img
            src={spinnerr}
            style={{
              width: "100px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AddPaymentComponent;
