import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { useSelector } from "react-redux";
import ModifyModalComponent from "../Components/modifyModal";

const ModifyModal = (props) => {
  const { quoteM, open, onCloseModal } = props;
  const [quote, setQuote] = useState([]);
  const [renew, setRenew] = useState(false);
  const [notes, setNotes] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [bound, setBound] = useState(false);
  const [reInstall, setReInstall] = useState(false);
  const [inputs, setInputs] = useState([]);
  const userId = useSelector((state) => state.UserId);
  const [open1, setOpen1] = useState(false);
  const companies = useSelector((state) => state.Companies);
  const optionsCo = companies?.map((e) => ({ value: e.id, label: e.name }));
  const onOpenModal1 = () => setOpen1(true);
  const onCloseModal1 = () => setOpen1(false);
  const checkNotes = () => {
    setBound(false);
    setInputs({ ...inputs, Status:null });
    setCancel(false);
    setReInstall(false);
    setRenew(false);
    setNotes(!notes);
  };
  const checkRenew = () => {
    setBound(false);
    setInputs({ ...inputs, Status: "Renew down" });
    setCancel(false);
    setReInstall(false);
    setRenew(!renew);
    setNotes(false);
  };
  const checkReinstall = () => {
    setBound(false);
    setInputs({ ...inputs, Status: "Re-install" });
    setCancel(false);
    setRenew(false);
    setReInstall(!reInstall);
    setNotes(false);
  };
  const checkBound = () => {
    setRenew(false);
    setInputs({ ...inputs, Status: "Sold" });
    setCancel(false);
    setReInstall(false);
    setBound(!bound);
    setNotes(false);
  };

  const checkCancel = () => {
    setBound(false);
    setInputs({ ...inputs, Status: "Cancelled" });
    setRenew(false);
    setReInstall(false);
    setCancel(!cancel);
    setNotes(false);
  };
  useEffect(() => {
    setInputs({ ...inputs, QuoteId: quoteM.id, UserId: userId });
  }, [props, userId]);
  const submit = () => {
    inputs.Status
      ? fetch(`https://truewayagentbackend.com//modifyQuote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputs),
        }).then(onOpenModal1())
      : fetch(`https://truewayagentbackend.com//addNotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      }).then(onOpenModal1())
  };

  return (
    <ModifyModalComponent
    quoteM={quoteM}
    quote={quote}
    renew={renew}
    notes={notes}
    cancel={cancel}
    bound={bound}
    reInstall={reInstall}
    inputs={inputs}
    setQuote={setQuote}
    setRenew={setRenew}
    setNotes={setNotes}
    setCancel={setCancel}
    setBound={setBound}
    setReInstall={setReInstall}
    setInputs={setInputs}
    useSelector={useSelector}
    setOpen1={setOpen1}
    open1={open1}
    open={open}
    onCloseModal={onCloseModal}
    onOpenModal1={onOpenModal1}
    onCloseModal1={onCloseModal1}
    checkNotes={checkNotes}
    checkRenew={checkRenew}
    checkReinstall={checkReinstall}
    checkBound={checkBound}
    checkCancel={checkCancel}
    submit={submit}
    optionsCo={optionsCo}
    />
    
  );
};
export default ModifyModal