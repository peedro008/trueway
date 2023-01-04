import { useEffect, useState } from "react";
import axios from "axios";
import spinnerr from "../assets/loadingIcon.gif";


function ProducerSales({ aboutProps, google }) {
  const [chart, setChart] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [dato, setDato] = useState([]);
  const [year, setYear] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [time, setTime] = useState(false);

  let timer1 = setTimeout(() => setShowLoading(true), 1000);
  let userId = aboutProps;

  useEffect(() => {
    axios
      .get(`https://truewayagentbackend.com/producerQuotes?UserId=${userId}`)
      .then(function (response) {
        setQuotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    const date = new Date();
    const DATE =
      date.getFullYear() +
      (date.getMonth() + 1 > 9 ? "-" : "-0") +
      (date.getMonth() + 1) +
      "-" +
      date.getDate();
    const Yquotes = [
      quotes[0]?.filter((e) => e.date.substring(0, 4) == DATE.substring(0, 4)),
      quotes[1]?.filter(
        (e) => e.closingDate.substring(0, 4) == DATE.substring(0, 4)
      ),
    ];
    let m0 = 0;
    let m1 = 0;
    let m2 = 0;
    let m3 = 0;
    let m4 = 0;
    let m5 = 0;
    let m6 = 0;
    let m7 = 0;
    let m8 = 0;
    let m9 = 0;
    let m10 = 0;
    let m11 = 0;
    let pm0 = 0;
    let pm1 = 0;
    let pm2 = 0;
    let pm3 = 0;
    let pm4 = 0;
    let pm5 = 0;
    let pm6 = 0;
    let pm7 = 0;
    let pm8 = 0;
    let pm9 = 0;
    let pm10 = 0;
    let pm11 = 0;

    Yquotes[0]?.map((e) => {
      if (e.date.substring(5, 7) == "01") {
        pm0 = pm0 + 1;
      } else if (e.date.substring(5, 7) == "02") {
        pm1 = pm1 + 1;
      } else if (e.date.substring(5, 7) == "03") {
        pm2 = pm2 + 1;
      } else if (e.date.substring(5, 7) == "04") {
        pm3 = pm3 + 1;
      } else if (e.date.substring(5, 7) == "05") {
        pm4 = pm4 + 1;
      } else if (e.date.substring(5, 7) == "06") {
        pm5 = pm5 + 1;
      } else if (e.date.substring(5, 7) == "07") {
        pm6 = pm6 + 1;
      } else if (e.date.substring(5, 7) == "08") {
        pm7 = pm7 + 1;
      } else if (e.date.substring(5, 7) == "09") {
        pm8 = pm8 + 1;
      } else if (e.date.substring(5, 7) == "10") {
        pm9 = pm9 + 1;
      } else if (e.date.substring(5, 7) == "11") {
        pm10 = pm10 + 1;
      } else if (e.date.substring(5, 7) == "12") {
        pm11 = pm11 + 1;
      }
    });
    Yquotes[1]?.map((e) => {
      if (e.closingDate.substring(5, 7) == "01") {
        m0 = m0 + 1;
      } else if (e.closingDate.substring(5, 7) == "02") {
        m1 = m1 + 1;
      } else if (e.closingDate.substring(5, 7) == "03") {
        m2 = m2 + 1;
      } else if (e.closingDate.substring(5, 7) == "04") {
        m3 = m3 + 1;
      } else if (e.closingDate.substring(5, 7) == "05") {
        m4 = m4 + 1;
      } else if (e.closingDate.substring(5, 7) == "06") {
        m5 = m5 + 1;
      } else if (e.closingDate.substring(5, 7) == "07") {
        m6 = m6 + 1;
      } else if (e.closingDate.substring(5, 7) == "08") {
        m7 = m7 + 1;
      } else if (e.closingDate.substring(5, 7) == "09") {
        m8 = m8 + 1;
      } else if (e.closingDate.substring(5, 7) == "10") {
        m9 = m9 + 1;
      } else if (e.closingDate.substring(5, 7) == "11") {
        m10 = m10 + 1;
      } else if (e.closingDate.substring(5, 7) == "12") {
        m11 = m11 + 1;
      }
    });
    setYear([
      [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11],
      [pm0, pm1, pm2, pm3, pm4, pm5, pm6, pm7, pm8, pm9, pm10, pm11],
    ]);
  }, [quotes]);

  useEffect(() => {
    if (year[0]) {
      let pes = [];

      year[0].map((e, index) => {
        pes.push([`${index + 1}`, e, year[1][index]]);
      });
      setDato(pes);
    }
  }, [year]);

  useEffect(() => {
      setTimeout(() => {
        setTime(true);
        if (google && !chart && dato.length) {
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Topping");
        data.addColumn("number", "Sold Quotes", "color:#6F52ED");
        data.addColumn("number", "Unsold Quotes", "color:#FF7A00");
        data.addRows(dato);

        // Set chart options
        var options = {
          title: "Quotes sold per month",
          width: 800,
          height: 220,
          fontSize: 12,

          titleTextStyle: {
            marginBottom: "20px",
            fontName: "Gilroy-Regular",
            fontSize: "16",
            marginLeft: "-10px",
          },
          colors: ["#6F52ED", "#FF7A00"],
          backgroundColor: "#EBEFF2",
          bar: { groupWidth: "20%" },
        };

        // Instantiate and draw our chart, passing in some options.
        const newChart = new google.visualization.ColumnChart(
          document.getElementById("producerSales")
        );
        newChart.draw(data, options);
      
        setChart(newChart);
      }
    }, 4000);
  }, [chart, dato]);

  return (
    <>
      {!google && <p>Google 404</p>}
      {!time ? (
        <img
          src={spinnerr}
          style={{
            width: "100px",
            position: "absolute",
            right: "65vw",
            top: "50vh",
          }}
        />
      ) : (
        <div
        style={{ minHeight: "400px", minWidth: "66vw" }}
        id="producerSales"
      ></div>
      )}

    
    </>
  );
}

export default ProducerSales;
