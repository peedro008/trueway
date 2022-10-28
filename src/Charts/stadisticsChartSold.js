import { useEffect, useState } from "react";
import axios from "axios"
import spinnerr from "../assets/spinnerr.gif"
function StatsSold ({google, quotes, producers}) {
  const [chart, setChart] = useState(null);
 
  const [dato, setDato]= useState([])

  const [time, setTime]= useState(false)

      
      useEffect(()=>{
        
        let pes = []
          producers.map((e, index)=>{
            



            
            pes.push(
              [e.name,        quotes.filter(
                (f) =>
                 ( f.QuoteStatuses[0].UserId == e.UserId)&&
                  f.QuoteStatuses.sort(function (a, b) {
                    return b.id - a.id ;
                  })[0].Status == "Sold"
              ).length])
          })
          setDato(pes)
      }, [quotes, producers])
  useEffect(() => {
    setTimeout(()=>{
      setTime(true)
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Sold', "color:#6F52ED");
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'New Polizas',
                     
                     fontSize:12,
                     titleTextStyle: {
                      
                      fontName: "Gilroy-Regular",
                      fontSize: "14", 
                      marginLeft:"-10px"
                  },

                     "colors": ["#6F52ED","#FF7A00"],
                     backgroundColor:"#EBEFF2",

                     bar: { groupWidth: "20%"},
                     vAxis: {format:'0'},
                     hAxis: {format:'0'}
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.ColumnChart(document.getElementById('SoldChart'));
      newChart.draw(data, options);
     
      setChart(newChart);
     
    }},200)
    
  }, [ dato, chart, ]);
  
  return (
    <>
      
      {!google && <p>Google 404</p>}
      {
        !time?
      <></>:
      <div style={{minHeight:"350px", minWidth:"46vw"}} id="SoldChart" className={!google ? 'd-none' : ''} ></div>
      }
    </>
  )
}

export default StatsSold;


