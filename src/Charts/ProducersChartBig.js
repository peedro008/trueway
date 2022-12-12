import { useEffect, useState } from "react";
import axios from "axios";
import spinnerr from "../assets/loadingIcon.gif";
import { useSelector } from "react-redux";
function PizzaChartBig({ google, producers, graficType }) {
  const [chart, setChart] = useState(null);
  const quotex = useSelector((s) => s.A_AVG);
  const [dato, setDato] = useState([]);
  const [color, setColor] = useState("#2b4162")
  const [time, setTime] = useState(false);

  console.log(quotex)
  useEffect(() => {
    let sold = [];
    let unsold = [];
    producers?.map((e, index) => {
      sold.push([
        e.name,
        quotex?.filter((g) => g.id == e.UserId)[0]?.sold
      ]);
    });

    producers?.map((e, index) => {
      unsold.push([
        e.name,
        quotex?.filter((g) => g.id == e.UserId)[0]?.unsold
      ]);
    });
    
    if (graficType === 'Sold') {
      setDato(sold.filter(e => e[1] !== 0 ) || sold);
      setColor('#6F52ED')
    } else {
      setDato(unsold.filter(e => e[1] !== 0) || unsold);
      setColor("#FF7A00")
    }

  }, [graficType, producers]);

  useEffect(() => {
    setTime(false)
    setTimeout(() => {
    
      if (google) {
        const data = new google.visualization.DataTable();
        data.addColumn("string", "Topping");
        data.addColumn("number", `${graficType}`, "color:#6F52ED");

        data.addRows(dato);

        // Set chart options
        var options = {
          title: `Quotes ${graficType} per seller`,

          fontSize: 12,
          titleTextStyle: {
            fontName: "Gilroy-Regular",
            fontSize: "14",
            marginLeft: "-10px",
          },

          colors: [color],
          backgroundColor: "#EBEFF2",
          bar: { groupWidth: "30%" },
          vAxis: { format: "0" },
          hAxis: { format: "0" },
        };

        setTime(true);
        // Instantiate and draw our chart, passing in some options.
        const newChart = new google.visualization.ColumnChart(
          document.getElementById("pizzaChart")
        );
        newChart.draw(data, options);

        setChart(newChart);
      }
    }, 400);
  }, [dato, producers, graficType]);

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

export default PizzaChartBig;
