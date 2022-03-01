import axios from "axios";
import { useEffect, useState } from "react";


function ProducerPie ({aboutProps, google}) {
  const [chart, setChart] = useState(null);
  const [quotes, setQuotes]= useState([])
    const [dato, setDato] = useState([
        ['Quoted'],
        ['Sold'],
        ['Cancelled'],
      ])

      useEffect (()=>{
        let Producer = aboutProps
      axios.get(`http://localhost:4000/producerQuotes?UserId=${Producer.UserId}`)
      .then(function(response){
          setQuotes(response.data)
         
          
          
      })
      .catch(error=>{
        console.log(error)  
      })
  },[aboutProps])

  useEffect(()=>{
      let quoted = 0
      let cancelled = 0
      let sold = 0
      quotes.map(e=>e.QuoteStatuses[0].Status=="Cancelled"?
      cancelled= cancelled+1
      :e.QuoteStatuses[0].Status=="Quoted"?
      quoted=quoted+1:
      sold=sold+1
      )
      setDato([["Quoted",quoted],["Cancelled",cancelled],["Sold",sold]])
  },[quotes])

  useEffect(() => {
      setTimeout(()=>{
    if (google && !chart  && dato) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      
      
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Cancelations',
                  
                    pieHole: 0.4,
                   
                     'height':250,
                      "width":400,
                      
          
                      
                     backgroundColor:"#e5e5e5"
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.PieChart(document.getElementById('producerPie'));
      newChart.draw(data, options);
      
      setChart(newChart);
    }}, 200)
  }, [dato, chart]);

  return (
    <>
      
      <div id="producerPie" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default ProducerPie;
