import axios from "axios";

import React, { useState } from "react";
import { BiMessageSquareAdd } from "react-icons/bi";
import spinnerr from "../assets/loadingIcon.gif";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Icon from "../assets/Icon.png";
import ErrorIcon from "../assets/cross-mark.png";
import { Controller } from "react-hook-form";

const AddQuoteComponent = ({
  CategoAux,
  setCategoAux,
  onSubmit,
  handleNewClient,
  register,
  handleSubmit,
  control,
  errors,
  reload,
  optionsCa,
  optionsCo,
  optionsL,
  optionsD,
  optionsC,
  neww,
  open,
  setValue,
  setNeww,
  newClient,
  inputs,
  ERR,
  setInputs,
  categories,
  companies,
  clients,
  dealers,
  locations,
  dealerData,
  setDealerData,
  show,
  onCloseModal,
  addingQuote,
  quoteStatus,
}) => {
  const [colorButtom, setColorButtom] = useState(true);
  return (
    <div className="genericDiv">
      <div className="genericHeader">
        <p className="genericTitle">Add quote</p>
      </div>

      <div className="AQcontainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="AQrowContainer2">
            <div className="AQinputContainer">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p className="AQinputName">Client Name</p>
                <BiMessageSquareAdd
                  onClick={() => {
                    handleNewClient();
                    setColorButtom(!colorButtom);
                  }}
                  size="20"
                  color={colorButtom ? "#28C76F" : "#DC4C64"}
                  style={{ marginLeft: "60px", cursor: "pointer" }}
                />
              </div>
              {!newClient ? (
                <>
                  <Controller
                    control={control}
                    name="ClientId"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        value={optionsC?.find((c) => c.value === value)}
                        onChange={(val) => {
                          onChange(val.value);
                          setDealerData({ ...dealerData, ClientId: val.value });
                        }}
                        control={control}
                        options={clients?.map((e) => ({
                          value: e.id,
                          label: e.name,
                        }))}
                        name={"ClientId"}
                        className="PAYselect"
                        placeholder="Select Client"
                      />
                    )}
                  />

                  {ERR.ClientId && (
                    <p className="FORMerror">"Client is a required field"</p>
                  )}
                  <p className="FORMerror">{errors.UserId?.message}</p>
                  <p className="FORMerror">{errors.UserId?.message}</p>
                </>
              ) : (
                <>
                  <input
                    className="AQinput"
                    placeholder="Client name"
                    value={inputs.clientName}
                    {...register("name")}
                  />
                  <p className="FORMerror">Client's name is required</p>
                </>
              )}
            </div>
            {newClient && (
              <div className="AQinputContainer">
                <p className="AQinputName">Email</p>
                <input
                  placeholder="Client email"
                  className="AQinput"
                  value={inputs.clientEmail}
                  {...register("email")}
                />
                <p className="FORMerror">Client's email is required</p>
              </div>
            )}
            {newClient && (
              <div className="AQinputContainer">
                <p className="AQinputName">Phone</p>
                <input
                  placeholder="Client phone"
                  className="AQinput"
                  value={inputs.Tel}
                  {...register("tel")}
                />
                <p className="FORMerror">{errors.tel?.message}</p>
              </div>
            )}

            {newClient && (
              <div className="AQinputContainer">
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
            )}
          </div>

          {newClient && (
            <div className="AQrowContainer">
              <div className="AQinputContainer">
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <p className="PAYtitle">Address</p>
                </div>
                {!show ? (
                  <div
                    class="autocomplete-container"
                    id="autocomplete-container"
                  >
                    <Controller
                      control={control}
                      name="address"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <></>
                        //  <GeoapifyContext apiKey="fae2fbe3125e4b1d870dd3ab7c96f6b3">
                        //   <GeoapifyGeocoderAutocomplete
                        //     placeSelect={(value) => {

                        //       onChange(value.properties.formatted);
                        //     }}
                        //     suggestionsChange={(value) => {
                        //       console.log(value);
                        //     }}
                        //   />
                        // </GeoapifyContext>
                      )}
                    />
                  </div>
                ) : (
                  <input
                    {...register("address")}
                    placeholder="Address"
                    className="AQinput"
                  ></input>
                )}
                <p className="FORMerror">{errors.address?.message}</p>
              </div>

              <div className="AQinputContainer"></div>
              <div className="AQinputContainer"></div>
            </div>
          )}

          <div className="AQrowContainer">
            <div className="AQinputContainer">
              <p className="AQinputName">Category</p>
              <Controller
                control={control}
                name="CategoryId"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={optionsCa.find((c) => c.value === value)}
                    onChange={(val) => {
                      onChange(val.value);
                      setValue(
                        "CategoryNsd",
                        optionsCa.find((c) => c.value === val.value).NSD
                      );
                      setCategoAux(true);
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

              <p className="FORMerror">{errors.CategoryId?.message}</p>
            </div>
            <div className="AQinputContainer">
              <p className="AQinputName">Company</p>
              <Controller
                control={control}
                name="CompanyId"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={optionsCo?.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    control={control}
                    options={companies?.map((e) => ({
                      value: e.id,
                      label: e.name,
                    }))}
                    name={"CompanyId"}
                    className="PAYselect"
                    placeholder="Select Company"
                  />
                )}
              />
              <p className="FORMerror">{errors.CompanyId?.message}</p>
            </div>
            <div className="AQinputContainer">
              <p className="AQinputName">Office</p>

              <Controller
                control={control}
                name="LocationId"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    value={optionsL?.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    control={control}
                    options={locations?.map((e) => ({
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
            <div className="AQinputContainer">
              <p className="AQinputName">Dealer</p>
              <div className="AQyesNoContainer">
                <div>
                  <input
                    className="AQcheckInput"
                    type="checkbox"
                    checked={inputs.DealerSalePerson}
                    name="DealerSalePersonId"
                    onChange={(event) =>
                      setInputs({
                        ...inputs,
                        DealerSalePerson: !inputs.DealerSalePerson,
                      })
                    }
                  />
                  {inputs.DealerSalePerson ? (
                    <p className="AQyesNoText">Yes</p>
                  ) : (
                    <p className="AQyesNoText">No</p>
                  )}
                </div>
                {inputs.DealerSalePerson && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "240px",
                    }}
                  >
                    <Controller
                      control={control}
                      name="DealerId"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Select
                          value={optionsD?.find((c) => c.value === value)}
                          onChange={(val) => {
                            onChange(val.value);
                            setDealerData({
                              ...dealerData,
                              DealerSalePersonId: val.value,
                            });
                          }}
                          control={control}
                          options={dealers?.map((e) => ({
                            value: e.id,
                            label: e.name,
                          }))}
                          name={"DealerId"}
                          className="PAYselect"
                          placeholder="Select Dealer"
                        />
                      )}
                    />
                    <input
                      className="AQinput2"
                      style={{ width: "60px", marginLeft: "20px" }}
                      placeholder="Amount"
                      key="amount"
                      name="amount"
                      type="number"
                      value={dealerData.amount}
                      onChange={(e) => {
                        setDealerData({
                          ...dealerData,
                          amount: e.target.value,
                        });
                      }}
                    />
                    {ERR.DealerId && (
                      <p className="FORMerror">"Client is a required field"</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="AQrowContainer1">
            <div className="AQinputContainer">
              <p className="AQinputName">Down payment</p>
              <input
                type="number"
                className="AQinput"
                placeholder="Down payment"
                key="down"
                name="down"
                value={inputs.down}
                {...register("down")}
              />
              <p className="FORMerror">
                {errors.down?.message.substring(0, 24)}
              </p>
            </div>
            <div
              className="AQinputContainer"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="AQinputName">Monthly payment</p>
              <input
                type="number"
                className="AQinput"
                placeholder="Monthly payment"
                key="monthlyPayment"
                name="monthlyPayment"
                {...register("monthlyPayment")}
              />
              <p className="FORMerror">
                {errors.monthlyPayment?.message.substring(0, 24)}
              </p>
            </div>
            <div
              className="AQinputContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "start",
              }}
            >
              <p className="AQinputName">Total premium</p>
              <input
                type="number"
                className="AQinput"
                placeholder="Total premium"
                key="totalPremium"
                name="totalPremium"
                {...register("TotalPremium")}
              />
              <p className="FORMerror">
                {errors.TotalPremium?.message.substring(0, 24)}
              </p>
            </div>
            <div
              className="AQinputContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "start",
              }}
            >
              <div>
                <p className="AQinputName">Bound</p>
                <input
                  className="AQcheckInput"
                  type="checkbox"
                  checked={inputs.Bound}
                  name="Bound"
                  {...register("Bound")}
                  onChange={(event) =>
                    setInputs({ ...inputs, Bound: !inputs.Bound })
                  }
                />
                {inputs.Bound ? (
                  <p className="AQyesNoText">Yes</p>
                ) : (
                  <p className="AQyesNoText">No</p>
                )}

                {/* {inputs.Bound && (
                  <>
                    <div
                      className="AQinputContainer"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "start",
                        marginTop: "10px",
                      }}
                    >
                      <p className="AQinputName">Efective Date</p>
                      <input
                        type={"date"}
                        className="AQinput"
                        placeholder="Effective Date"
                        key="effectiveDate"
                        name="effectiveDate"
                        {...register("effectiveDate")}
                      />
                    </div>
                    <div
                      className="AQinputContainer"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "start",
                        marginTop: "10px",
                      }}
                    >
                      <p className="AQinputName">Expiration Date</p>
                      <input
                        type={"date"}
                        className="AQinput"
                        placeholder="Expiration Date"
                        key="expirationDate"
                        name="expirationDate"
                        {...register("expirationDate")}
                      />
                    </div>
                    <div
                      className="AQinputContainer"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "start",
                        marginTop: "10px",
                      }}
                    >
                      <p className="AQinputName">Policy Number</p>
                      <input
                        className="AQinput"
                        placeholder="Policy Number"
                        key="policyNumber"
                        name="policyNumber"
                        {...register("policyNumber")}
                      />
                    </div>
                  </>
                )} */}
              </div>
            </div>
          </div>
          {inputs.Bound && (
            <div className="AQrowContainer1">
              <div className="AQinputContainer">
                <p className="AQinputName">Policy Number</p>
                <input
                  className="AQinput"
                  placeholder="Policy Number"
                  key="policyNumber"
                  name="policyNumber"
                  {...register("policyNumber")}
                />
              </div>
              <div className="AQinputContainer">
                <p className="AQinputName">Efective Date</p>
                <input
                  type={"date"}
                  className="AQinput"
                  placeholder="Effective Date"
                  key="effectiveDate"
                  name="effectiveDate"
                  {...register("effectiveDate")}
                />
              </div>
              <div className="AQinputContainer">
                <p className="AQinputName">Expiration Date</p>
                <input
                  type={"date"}
                  className="AQinput"
                  placeholder="Expiration Date"
                  key="expirationDate"
                  name="expirationDate"
                  {...register("expirationDate")}
                />
              </div>
              <div className="AQinputContainer"></div>
            </div>
          )}

          <div className="AQwhiteContainer10">
            <div className="AQinputContainer">
              <p className="AQinputName">NSD</p>
              <div className="AQyesNoContainer">
                <div>
                  <input
                    className="AQcheckInput"
                    type="checkbox"
                    disabled={CategoAux ? false : true}
                    checked={inputs.NSD}
                    value={inputs.NSD}
                    key="NSD"
                    name="NSD"
                    onChange={(event) =>
                      setInputs({ ...inputs, NSD: !inputs.NSD })
                    }
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
                      type="number"
                      className="AQinput2"
                      placeholder="How much?"
                      key="NSDamount"
                      name="NSDamount"
                      value={inputs.NSDamount}
                      defaultValue={0}
                      {...register("NSDamount")}
                    />
                    <p className="FORMerror">{errors.NSDamount?.message}</p>{" "}
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
                      type="number"
                      className="AQinput2"
                      placeholder="How much"
                      defaultValue={0}
                      key="MVRamount"
                      name="MVRamount"
                      value={inputs.MVRamount}
                      {...register("MVRamount")}
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
                      type="number"
                      className="AQinput2"
                      placeholder="PIP value"
                      defaultValue={0}
                      key="dealerSalePerson"
                      name="dealerSalePerson"
                      {...register("PIPamount")}
                    />
                    <p className="FORMerror">{errors.NSDamount?.message}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex", width: "80%" }}>
            {" "}
            <div className="AQinputContainer">
              <p className="AQinputName">Notes</p>
              <textarea
                className="AQtextarea"
                placeholder="Notes"
                key="notes"
                name="notes"
                value={inputs.notes}
                {...register("notes")}
              />
              <p className="FORMerror">{errors.notes?.message}</p>
            </div>
            <div
              className="AQinputContainer"
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "start",
              }}
            >
              <p className="AQinputName">Payment Date (optional)</p>
              <input
                type={"date"}
                className="AQinput"
                placeholder="Monthly payment"
                key="monthlyPayment"
                name="monthlyPayment"
                {...register("date")}
              />
              <p className="FORMerror">
                {errors.monthlyPayment?.message.substring(0, 24)}
              </p>
            </div>
          </div>
        </form>
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
          className={addingQuote ? "PAYbuttonPayWaiting" : "PAYbuttonPay"}
        >
          <p className="PAYbuttonText">Add Quote</p>
        </button>
      </div>

      <Modal open={open} onClose={reload} center classNames={"modal"}>
        <div className="modal">
          <img
            src={quoteStatus === "Quote added successfully" ? Icon : ErrorIcon}
            style={{
              width: "35px",
              alignSelf: "center",
              marginTop: "25px",
              marginBottom: "10px",
            }}
          />

          <p className="modalText">{quoteStatus}</p>

          <button
            className="modalButton"
            onClick={reload}
            style={{ cursor: "pointer" }}
          >
            Continue
          </button>
        </div>
      </Modal>
      {addingQuote && (
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
};

export default AddQuoteComponent;
