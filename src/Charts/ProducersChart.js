import { useEffect, useState } from "react";
import axios from "axios";
import spinnerr from "../assets/loadingIcon.gif";
import { useSelector } from "react-redux";
function PizzaChart({ google, producers }) {
  const [chart, setChart] = useState(null);
  const quotex = useSelector((s) => s.A_AVG);
  const [dato, setDato] = useState([]);

  const [time, setTime] = useState(false);
  const prod = producers.filter(e => e[1] !== 0 && e[2] !== 0)
  useEffect(() => {
    console.log(prod)
    let pes = [];
    producers?.map((e, index) => {
      pes.push([
        e.name,
        quotex?.filter((g) => g.id == e.UserId)[0]?.sold,
        quotex?.filter((g) => g.id == e.UserId)[0]?.unsold,
      ]);
    });
    
    setDato(pes.filter(e => e[1] !== 0 || e[2] !== 0) || pes);
  }, [quotex]);
  useEffect(() => {
    setTimeout(() => {
      setTime(true);
      if (google && !chart) {
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Topping");
        data.addColumn("number", "Sold", "color:#6F52ED");
        data.addColumn("number", "Unsold", "color:#FF7A00");
        data.addRows(dato);

        // Set chart options
        var options = {
          title: "Quotes sold per seller",

          fontSize: 12,
          titleTextStyle: {
            fontName: "Gilroy-Regular",
            fontSize: "14",
            marginLeft: "-10px",
          },

          colors: ["#6F52ED", "#FF7A00"],
          backgroundColor: "#EBEFF2",

          bar: { groupWidth: "30%" },
          vAxis: { format: "0" },
          hAxis: { format: "0" },
        };

        // Instantiate and draw our chart, passing in some options.
        const newChart = new google.visualization.ColumnChart(
          document.getElementById("pizzaChart")
        );
        newChart.draw(data, options);

        setChart(newChart);
      }
    }, 400);
  }, [dato, quotex]);

  return (
    <>
      {!google && <p>Google 404</p>}
      {!time ? (
        <img
          src={spinnerr}
          style={{
            width: "150px",
            position: "absolute",
            right: "65vw",
            top: "40vh",
          }}
        />
      ) : (
        <div
          style={{ minHeight: "400px", minWidth: "66vw" }}
          id="pizzaChart"
          className={!google ? "d-none" : ""}
        ></div>
      )}
    </>
  );
}

export default PizzaChart;
