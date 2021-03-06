import axios from "axios";
import { useEffect, useState } from "react";


function PozzaChart ({google}) {
  const [chart, setChart] = useState(null);
  const [quotes, setQuotes]= useState([])
  const [dato, setDato] = useState([])
  const [asd, setAsd] = useState([])

    useEffect (()=>{
     
    axios.get(`http://localhost:8080/quotes`)
    .then(function(response){
        setQuotes(response.data)
       
        
        
    })
    .catch(error=>{
      console.log(error)  
    })
},[])

useEffect(()=>{
  let Sold = 0
  let Unsold = 0
  quotes.map(e=>{
    if(e.QuoteStatuses.some(f=>f.Status==="Sold")){
        Sold++
        
      } 
    })
  Unsold = quotes.length-Sold
    let pes = [["Unsold",Unsold],["Sold",Sold]]
    let pas = []
    pes.map(e=>{if(e[1]!==0)pas.push(e)})
    
  
    setDato(pas)

},[quotes])






  useEffect(() => {
  
   setTimeout(()=>{
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Quote status',
                  
                    pieHole: 0.4,
                    titleTextStyle: {
                      
                      fontName: "Gilroy-Regular",
                      fontSize: "14", 
                      marginLeft:"-10px"
                  },
                     'height':400,
                      "width":600,
                      "colors": ["#FFB800","#33D69F","#FF4C61","#777DA7","#ADD9F4"],
          
                      
                     backgroundColor:"#fafafa"
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.PieChart(document.getElementById('pozzaChart'));
      newChart.draw(data, options);
      
      setChart(newChart);
    }}, 700)
  }, [ dato, chart]);
  return (
    <>
      {!google && <p>Loading</p>}
      <div id="pozzaChart" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default PozzaChart;
