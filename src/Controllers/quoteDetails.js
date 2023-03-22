import axios from "axios";
import React, { useEffect, useState } from "react";
import QuoteDetailsComponent from "../Components/quoteDetails";

function QuoteDetails(props) {
  const id = props.location.aboutProps?.ID;
  const generic = props.location.aboutProps?.isGenericReport || "No";
  const data = props.location.aboutProps?.data || "Nada";
  console.log(generic);
  const paginator = props.location.aboutProps?.paginator;
  const [quote, setQuote] = useState([]);
  useEffect(() => {
    axios
      .get(`https://truewayagentbackend.com/idquotes?id=${id}`)
      .then(function (response) {
        setQuote(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <QuoteDetailsComponent
      quote={quote}
      id={id}
      paginator={paginator}
      generic={generic}
      data={data}
    />
  );
}

export default QuoteDetails;
