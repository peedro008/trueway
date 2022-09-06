import axios from "axios";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import useGoogleCharts from "../Charts/useGoogleCharts";
import ManagerDetailsComponent from "../Components/managerDetails";

const ManagerDetails = (props) => {
  let producer = props.location.aboutProps;

  const userId = useSelector((state) => state.UserId);
  const PRD = useSelector((state) => state.Producers);
  const [Producer, setProducer] = useState(null);
  const google = useGoogleCharts();
  const [quotes, setQuotes] = useState([]);
  const [payments, setPayments] = useState([]);
  const [mquotes, setMquotes] = useState([]);
  const [yquotes, setYquotes] = useState([]);
  const [lmquotes, setLmquotes] = useState([]);
  const [modify, setModify] = useState([]);
  const [mstat, setMstat] = useState([]);
  const [lmstat, setLmstat] = useState([]);
  const [mpay, setMpay] = useState([]);
  const [ypay, setYpay] = useState([]);
  const [lmpay, setLmpay] = useState([]);

  const [ystat, setYstat] = useState([]);
  const [dots1, setDots1] = useState(false);
  const [dots2, setDots2] = useState(false);
  const [dots3, setDots3] = useState(false);
  const [dots1V, setDots1V] = useState(1);
  const [dots2V, setDots2V] = useState(1);
  const [dots3V, setDots3V] = useState(1);
  const [NSD, setNSD] = useState(0);
  const [LmNSD, setLmNSD] = useState(0);
  const [yNSD, setYNSD] = useState(0);

  useEffect(() => {
    producer
      ? setProducer(producer)
      : setProducer(PRD?.filter((e) => e.UserId == userId)[0]);
  }, [userId]);
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/producerQuotes?UserId=${Producer?.UserId}`)
      .then(function (response) {
        setQuotes(response.data);

        console.log(Producer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Producer]);
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/getUserPayment?UserId=${Producer?.UserId}`)
      .then(function (response) {
        setPayments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Producer]);
  useEffect(() => {
    axios
      .get(`https://truewayagentBackend.com/getStatus`)
      .then(function (response) {
        let paz = response.data;

        setModify(paz.filter((e) => e.UserId == Producer?.UserId));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [Producer]);

  useEffect(() => {
    const date = new Date();
    const DATE =
      date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
    let MY = date.getFullYear() + "-0" + (date.getMonth() + 1);
    let LMY = date.getFullYear() + "-0" + (date.getMonth() );

    setYstat(
      modify.filter((e) => e.date.substring(0, 4) == DATE.substring(0, 4))
    );
    setMstat(
      modify.filter((e) => e.date.substring(0, 7) == DATE.substring(0, 7))
    );
    setLmstat(
      modify.filter((e) => {
       
        return e.date.indexOf(LMY) !== -1;
      })
    );

    setYquotes(
      quotes.filter((e) => e.date.substring(0, 4) == DATE.substring(0, 4))
    );
    setMquotes(
      quotes.filter((e) => e.date.substring(0, 7) == DATE.substring(0, 7))
    );

    setLmquotes(
      quotes.filter((e) => {
       
        return e.date.indexOf(LMY) !== -1;
      })
    
    );

    setYpay(
      payments.filter((e) => e.date.substring(0, 4) == DATE.substring(0, 4))
    );
    setMpay(
       payments.filter((e) => {
       
        return e.date.indexOf(MY) !== -1;
      })
    );
    setLmpay(
      payments.filter((e) => {
       
        return e.date.indexOf(LMY) !== -1;
      })
    );
  }, [payments, quotes, modify]);

  useEffect(() => {
    let pes = 0;
    let pas = 0;
    let pos = 0
    let pis = 0

    mquotes.map((e) => {
      if ( e.Category.id == 2&&!e.Payment&& e.QuoteStatuses.sort(function (a, b) {
        return b.id - a.id;
      })[0].Status=="Sold") {
        pes += 10;
      }
    })
    yquotes.map((e) => {
      if ( e.Category.id == 2&&!e.Payment&& e.QuoteStatuses.sort(function (a, b) {
        return b.id - a.id;
      })[0].Status=="Sold") {
        pas += 10;
      }
    })
    lmquotes.map((e) => {
      if ( e.Category.id == 2&&!e.Payment&& e.QuoteStatuses.sort(function (a, b) {
        return b.id - a.id;
      })[0].Status=="Sold") {
        pos += 10;
      }
    })

    mpay?.map((e) => {
      if (e.Category.name !== "HEALTH INSURANCE") {
        if ( e.Category.id == 2) {
          console.log("AAA")
          pes += 10;
        }
        if (e.NSDvalue !== "") {
          pes +=
            5 *
            (e.NSDamount
              ? parseFloat(e.NSDamount)
              : parseFloat(e.NSDvalue) / parseFloat(e.Category.NSDvalue));
        }
      }
    });
    ypay.map((e) => {
      if (e.Category?.name && e.Category?.name !== "HEALTH INSURANCE") {
        if (e.Quote && e.Category?.name == "HOMEOWNERS") {
          pas += 10;
        }
        if (e.NSDvalue !== "") {
          pas +=
            5 *
            (e.NSDamount
              ? parseFloat(e.NSDamount)
              : parseFloat(e.NSDvalue) / parseFloat(e.Category.NSDvalue));
        }
      }
    });
    lmpay.map((e) => {
      if (e.Category?.name && e.Category?.name !== "HEALTH INSURANCE") {
        if (e.Quote && e.Category?.name == "HOMEOWNERS") {
          pos += 10;
        }
        if (e.NSDvalue !== "") {
          pos +=
            5 *
            (e.NSDamount
              ? parseFloat(e.NSDamount)
              : parseFloat(e.NSDvalue) / parseFloat(e.Category.NSDvalue));
        }
      }
    });
    ;
    setNSD(pes);
    setYNSD(pas);
    setLmNSD(pos)
  }, [quotes, Producer, modify, ystat, mstat]);

  return (
<ManagerDetailsComponent
 lmstat={lmstat}
    lmquotes={lmquotes}
      quotes={quotes}
      setQuotes={setQuotes}
      payments={payments}
      setPayments={setPayments}
      mquotes={mquotes}
      setMquotes={setMquotes}
      modify={modify}
      setModify={setModify}
      mstat={mstat}
      setMstat={setMstat}
      yquotes={yquotes}
      setYquotes={setYquotes}
      mpay={mpay}
      setMpay={setMpay}
      ypay={ypay}
      setYpay={setYpay}
      ystat={ystat}
      setYstat={setYstat}
      dots1={dots1}
      setDots1={setDots1}
      dots2={dots2}
      setDots2={setDots2}
      dots3={dots3}
      setDots3={setDots3}
      dots1V={dots1V}
      setDots1V={setDots1V}
      dots2V={dots2V}
      setDots2V={setDots2V}
      dots3V={dots3V}
      setDots3V={setDots3V}
      NSD={NSD}
      setNSD={setNSD}
      yNSD={yNSD}
      setYNSD={setYNSD}
      Producer={Producer}
      google={google}
      LmNSD={LmNSD}
   

/>
  );
};
export default ManagerDetails;
