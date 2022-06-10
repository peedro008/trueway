import { useEffect, useState } from "react";
import axios from "axios"

function PizzaChart ({google}) {
  const [chart, setChart] = useState(null);
  const [producers, setProducers]= useState([])
  const [modify, setModify]= useState([])
  const [dato, setDato]= useState([])
  const [quotes, setQuotes]= useState([])
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/quotes`)
        .then(function(response){
            setQuotes(response.data)
            
        
            
        })
       
        .catch(error=>{
          console.log(error)  
        })

},[])
      useEffect(()=>{
          axios.get(`http://localhost:8080/getProducer`)
              .then(function(response){
                  setProducers(response.data)
              })
              .catch(error=>{
                console.log(error)  
              })
      
      },[])
      useEffect(()=>{
          axios.get(`http://localhost:8080/getStatus`)
              .then(function(response){
                  setModify(response.data)
              })
              .catch(error=>{
                console.log(error)  
              })
      
      },[])
      
      useEffect(()=>{
        let pes = []
          producers.map((e, index)=>{
            
            pes.push(
              [e.name, modify.filter(f=>f.User.name==e.name&&f.Status=="Sold").length,
               quotes.filter(f=>f.User.name==e.name&&f.QuoteStatuses.sort(function (a, b) {return  b.id - a.id;})[0].Status=="Quoted").length])
          })
          setDato(pes)
      }, [quotes, producers, modify])
  useEffect(() => {
    setTimeout(()=>{
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Sold', "color:#6F52ED");
      data.addColumn('number', 'Unsold',"color:#FF7A00");
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Quotes sold per seller',
                     
                     fontSize:12,
                     titleTextStyle: {
                      
                      fontName: "Gilroy-Regular",
                      fontSize: "14", 
                      marginLeft:"-10px"
                  },

                     "colors": ["#6F52ED","#FF7A00"],
                     backgroundColor:"#fafafa",

                     bar: { groupWidth: "20%"},
                     vAxis: {format:'0'},
                     hAxis: {format:'0'}
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.ColumnChart(document.getElementById('pizzaChart'));
      newChart.draw(data, options);
   
      setChart(newChart);
    }},1000)
  }, [ dato, chart, ]);
  
  return (
    <>
      {!google && <p>asssad</p>}
      <div style={{minHeight:"350px", minWidth:"66vw"}} id="pizzaChart" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default PizzaChart;


