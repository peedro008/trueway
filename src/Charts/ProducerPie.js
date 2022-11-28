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
 let userId = aboutProps
 useEffect (()=>{
      
      
  axios.get(`http://localhost:8080/quotes`)
  .then(function(response){
      let paz = response.data

      setQuotes(paz.filter(e=>e.UserId==userId))
  })
  .catch(error=>{
    console.log(error)  
  })
},[aboutProps])

  useEffect(()=>{
      let quoted = 0
      let cancelled = 0
      let sold = 0
      quotes.map(e=>e.QuoteStatuses.sort(function(a,b){return b.id-a.id})[0].Status=="Quoted"?
      quoted=quoted+1:
      e.QuoteStatuses.sort(function(a,b){return b.id-a.id})[0].Status=="Cancelled"?
      cancelled= cancelled+1
      :
           sold=sold+1
      )
      setDato([["Quoted",quoted],["Cancelled",cancelled],["Sold",sold]])
  },[quotes])
 console.log(quotes)
  useEffect(() => {
    setTimeout(()=>{
    if (google && !chart  ) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      
      
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Sellers Average',
                    fontColor:"#000000",
                    pieHole: 0.4,
                    "colors": ["#FFB800","#FF4C61","#33D69F"],
                   
                     'height':250,
                      "width":380,
                   
                      titleTextStyle: {
                     
                        fontName: "Gilroy-Regular",
                        fontSize: 16, 
                        marginLeft:"-10px"
                    },
                      
                     backgroundColor:"#EBEFF2"
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.PieChart(document.getElementById('producerPie'));
      newChart.draw(data, options);
      
      setChart(newChart);
    }}, 1000)
    
  }, [dato, chart]);

  return (
    <>
      
      <div id="producerPie" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default ProducerPie;
