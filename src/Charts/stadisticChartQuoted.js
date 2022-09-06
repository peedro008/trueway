import { useEffect, useState } from "react";
import axios from "axios"
import spinnerr from "../assets/spinnerr.gif"
function StatsQuoted ({google, quotes, producers}) {
  const [chart, setChart] = useState(null);
 
  const [dato, setDato]= useState([])

  const [time, setTime]= useState(false)

      
      useEffect(()=>{
        
        let pes = []
          producers.map((e, index)=>{
            
            pes.push(
              [e.name, quotes.filter(f=>f.User.name==e.name).length])
          })
          setDato(pes)
      }, [quotes, producers])
  useEffect(() => {
    setTimeout(()=>{
      setTime(true)
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Quotes', "color:#6F52ED");
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Quotes',
                     
                     fontSize:12,
                     titleTextStyle: {
                      
                      fontName: "Gilroy-Regular",
                      fontSize: "14", 
                      marginLeft:"-10px"
                  },

                     "colors": ["#FF7A00"],
                     backgroundColor:"#EBEFF2",

                     bar: { groupWidth: "20%"},
                     vAxis: {format:'0'},
                     hAxis: {format:'0'}
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.ColumnChart(document.getElementById('pizzaChart'));
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
      <div style={{minHeight:"350px", minWidth:"46vw"}} id="pizzaChart" className={!google ? 'd-none' : ''} ></div>
      }
    </>
  )
}

export default StatsQuoted;


