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
      
      
  axios.get(`https://truewayagentbackend.com/getStatus`)
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
      quotes.map(e=>e.Status=="Cancelled"?
      cancelled= cancelled+1
      :e.Status=="Quoted"?
      quoted=quoted+1:
      sold=sold+1
      )
      setDato([["Quoted",quoted],["Cancelled",cancelled],["Sold",sold]])
  },[quotes])

  useEffect(() => {
    setTimeout(()=>{
    if (google && !chart  ) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      
      
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Cancelations',
                  
                    pieHole: 0.4,
                    "colors": ["#FFB800","#33D69F","#FF4C61"],
                   
                     'height':250,
                      "width":400,
                   
                      titleTextStyle: {
                     
                        fontName: "Gilroy",
                        fontSize: 16, 
                        marginLeft:"-10px"
                    },
                      
                     backgroundColor:"#fbfbfb"
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
