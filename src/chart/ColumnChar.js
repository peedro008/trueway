import axios from "axios";
import { useEffect, useState } from "react";


function PozzaChart ({google}) {
  const [chart, setChart] = useState(null);
  const [quotes, setQuotes]= useState([])
  const [dato, setDato] = useState([])
  const [asd, setAsd] = useState([])

    useEffect (()=>{
     
    axios.get(`http://localhost:4000/quotes`)
    .then(function(response){
        setQuotes(response.data)
       
        
        
    })
    .catch(error=>{
      console.log(error)  
    })
},[])

useEffect(()=>{
    
    let pes = []
    quotes.map(e=>{
      pes.push((e.QuoteStatuses.sort(function(a,b){return b.id-a.id})[0].Status))
    })
    setAsd(pes)

    
},[quotes])
useEffect(()=>{
    let quoted = 0
    let cancelled = 0
    let sold = 0
    let renew = 0
    let reins = 0
    asd.map(e=>{
      e=="Cancelled"?
      cancelled= cancelled+1
      :e=="Quoted"?
      quoted=quoted+1
      :e=="Renew Down"?
      renew=renew+1
      :e=="Sold"?
      sold=sold+1
      :
      reins=reins+1}
      )
      setDato([["Quoted",quoted],["Cancelled",cancelled],["Sold",sold], ["Renew Down",renew],["Re-install",reins]])
},[asd])

  useEffect(() => {
   setTimeout(()=>{
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      console.log(dato)
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Quote status',
                  
                    pieHole: 0.4,
                   
                     'height':400,
                      "width":600,
                      
          
                      
                     backgroundColor:"#e5e5e5"
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.PieChart(document.getElementById('pozzaChart'));
      newChart.draw(data, options);
      
      setChart(newChart);
    }}, 200)
  }, [ dato, chart]);
  return (
    <>
      {!google && <p>sad</p>}
      <div id="pozzaChart" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default PozzaChart;
