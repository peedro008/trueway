import { useEffect, useState } from "react";
import axios from "axios"

function PizzaChart ({google}) {
  const [chart, setChart] = useState(null);
  const [producers, setProducers]= useState([])
  const [quotes, setQuotes]= useState([])
  const [dato, setDato]= useState([])

      useEffect(()=>{
          axios.get(`https://truewayagentbackend.com/getProducer`)
              .then(function(response){
                  setProducers(response.data)
              })
              .catch(error=>{
                console.log(error)  
              })
      
      },[])
      useEffect(()=>{
          axios.get(`https://truewayagentbackend.com/getStatus`)
              .then(function(response){
                  setQuotes(response.data)
              })
              .catch(error=>{
                console.log(error)  
              })
      
      },[])
      useEffect(()=>{
        let pes = []
          producers.map((e, index)=>{
            
            pes.push([e.name, quotes.filter(f=>f.User.name==e.name&&f.Status!=="quoted"&&f.Status!=="Cancelled").length, quotes.filter(f=>f.User.name==e.name&&f.Status!=="quoted"&&f.Status!=="Cancelled"&&f.Quote.PIPvalue!==0).length])
          })
          setDato(pes)
      }, [quotes])
  useEffect(() => {
    setTimeout(()=>{
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Quotes', "color:#6F52ED");
      data.addColumn('number', 'PIP',"color:#FF7A00");
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Quotes sold per month',
                     
                     fontSize:12,
                     titleTextStyle: {
                      
                      fontName: "Gilroy",
                      fontSize: "14", 
                      marginLeft:"-10px"
                  },

                     "colors": ["#6F52ED","#FF7A00"],
                     backgroundColor:"#fafafa",

                     bar: { groupWidth: "10%"},
                     vAxis: {format:'0'},
                     hAxis: {format:'0'}
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.ColumnChart(document.getElementById('pizzaChart'));
      newChart.draw(data, options);
      console.log(dato)
      setChart(newChart);
    }},1000)
  }, [ chart, dato]);
  
  return (
    <>
      {!google && <p>asssad</p>}
      <div style={{minHeight:"350px", minWidth:"66vw"}} id="pizzaChart" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default PizzaChart;


