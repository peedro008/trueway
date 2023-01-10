import { useEffect, useState } from "react";
import axios from "axios";
import spinnerr from "../assets/loadingIcon.gif";
import { useSelector } from "react-redux";
function PizzaChart({ google, producers }) {
  const [chart, setChart] = useState(null);
  const quotex = useSelector((s) => s.A_AVG);
  const [dato, setDato] = useState([]);

  const [time, setTime] = useState(false);

  useEffect(() => {
    let pes = [];
    producers?.map((e) => {
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
        data.addColumn("number", "Sold", "color:#002752");
        data.addColumn("number", "Unsold", "color:#D8AF4D");
        data.addRows(dato);

        // Set chart options
        var options = {
          title: "Quotes sold and unsold this month",

          fontSize: 12,
          titleTextStyle: {
            fontName: "Gilroy-Regular",
            fontSize: "14",
            marginLeft: "-10px",
          },

          colors: ['#002752', "#D8AF4D"],
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
            width: "100px",
            position: "absolute",
            right: "65vw",
            top: "40vh",
          }}
        />
      ) : (
        <div
          style={{ minHeight: "500px", minWidth: "90vw" }}
          id="pizzaChart"
          className={!google ? "d-none" : ""}
        ></div>
      )}
    </>
  );
}

export default PizzaChart;
