import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spinnerr from "../assets/spinnerr.gif"

function PozzaChart ({google}) {
  const [chart, setChart] = useState(null);

  const [dato, setDato] = useState([])
  const [asd, setAsd] = useState([])
  const [time, setTime]= useState(false)
  const AVG = useSelector(s=>s.AVG)

useEffect(()=>{
  let Sold = 0
  let Unsold = 0
  AVG?.map(e=>{
    Sold =Sold + e.sold
    Unsold=Unsold+ e.unsold
    })

    let pes = [["Unsold",Unsold],["Sold",Sold]]
    let pas = []
    pes.map(e=>{if(e[1]!==0)pas.push(e)})
    
  
    setDato(pas)

},[AVG])






  useEffect(() => {
  
   setTimeout(()=>{
    setTime(true)
    if (google && !chart) {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'Slices');
      
      data.addRows(dato);
      
      // Set chart options
      var options = {'title':'Anual Quotes',
                  
                    pieHole: 0.4,
                    titleTextStyle: {
                      
                      fontName: "Gilroy-Regular",
                      fontSize: "14", 
                      marginLeft:"-10px"
                  },
                     'height':550,
                      "width":700,
                      "colors": ['#002752',"#D8AF4D"],
          
                      
                     backgroundColor:"#EBEFF2"
                    };
      
      // Instantiate and draw our chart, passing in some options.
      const newChart = new google.visualization.PieChart(document.getElementById('pozzaChart'));
      newChart.draw(data, options);
      
      setChart(newChart);
    }}, 100)
  }, [ dato, chart]);
  return (
    <>
      {!google && <p>Loading</p>}
     {!time? 
     <div style={{height:"400px", width:"650px"}}><img src={spinnerr} style={{width:"100px", position:"absolute", right:"65vw", top:"40vh"}}/></div> :
      <div id="pozzaChart" className={!google ? 'd-none' : ''} />}
    </>
  )
}

export default PozzaChart;
