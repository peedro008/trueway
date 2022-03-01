import { useEffect, useState } from "react";
import axios from "axios"

function PizzaChart ({google}) {
  const [chart, setChart] = useState(null);
  const [producers, setProducers]= useState([])
  const [quotes, setQuotes]= useState([])
  const [dato, setDato]= useState([])
  console.log(quotes.filter(f=>f.User.name=="Producer").length)
      useEffect(()=>{
          axios.get(`http://localhost:4000/getProducer`)
              .then(function(response){
                  setProducers(response.data)
              })
              .catch(error=>{
                console.log(error)  
              })
      
      },[])
      useEffect(()=>{
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
          producers.map((e, index)=>{
            
            pes.push([e.name, quotes.filter(f=>f.User.name==e.name).length, (quotes.filter(f=>f.User.name==e.name).filter(f=>f.PIPvalue!==0).length)])
          })
          setDato(pes)
      }, [quotes])
  useEffect(() => {
    
    if (google && !chart&& dato.length) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Quotes', "color:#6F52ED");
      data.addColumn('number', 'PIP',"color:#FF7A00");
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Quotes sold per month',
                     'width':995,
                     "height": 350,
                     fontSize:12,
                     

                     "colors": ["#6F52ED","#FF7A00"],
                     backgroundColor:"#E5E5E5",
                     bar: { groupWidth: "20%"},
                     vAxis: {format:'0'},
                     hAxis: {format:'0'}
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.ColumnChart(document.getElementById('pizzaChart'));
      newChart.draw(data, options);
      console.log(dato)
      setChart(newChart);
    }
  }, [ chart, dato]);
  
  return (
    <>
      {!google && <p>asssad</p>}
      <div id="pizzaChart" className={!google ? 'd-none' : ''} />
    </>
  )
}

export default PizzaChart;


