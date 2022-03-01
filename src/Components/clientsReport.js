import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import SearchField from "react-search-field";

function ClientsReport() {
    const [clients, setPayments] = useState([])
 
    const [search, setSearch] = useState("")
    
    useEffect(() => {
        axios.get(`http://localhost:4000/clients`)
        .then(function(response){
            setPayments(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [])
    
  return (
    <div className='genericDiv1'>
        <div className="genericHeader">
                <p className="genericTitle">Client list</p>
        </div>
        <div className="REPcontrol">
       
         <div className="DAIsearch">
         <SearchField 
            classNames="pepee"
            placeholder='Search item'
            onChange={setSearch}
        /></div>

                </div>
           <table class="table2">
      
        <tbody>
            <tr>
                <th scope="col" className="column1"><p   className="REPtype">Client name</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Client email</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Client phone</p></th>
                

            </tr>
            {
                !search?
                clients.reverse().map((e)=>{
                   
                   return (
                       
                            <tr>
                            
                            <td className="ClientName" scope="row">
                                <NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }}
                                 to={{
                                    pathname:("/clientedit"),
                                    aboutProps:e}}> 
                                    {e.name}
                                </NavLink>
                            </td>
                            <td className="ClientName" scope="row">
                            <NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }}
                                 to={{
                                    pathname:("/clientedit"),
                                    aboutProps:e}}>{e.email}
                                    </NavLink>
                            </td>    
                                           
                            <td className="ClientName" scope="row">
                            <NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }}
                                 to={{
                                    pathname:("/clientedit"),
                                    aboutProps:e}}>{e.tel}
                                    </NavLink>
                                </td>  
                           
                        
                        </tr>
                     
                     
                     
                     
                     )
                     
                    
                    })

                :
                (clients.filter(e=>(e.name.toLowerCase()).includes(search.toLowerCase()))).map((e)=>{
                    return (
                        <tr>
                            <td className="ClientName" scope="row">{e.name}</td>
                            <td className="ClientName" scope="row">{e.email}</td>           
                            <td className="ClientName" scope="row">{e.tel}</td>  
                               
                        
                        </tr>
                     
                     
                     
                     
                     )
                     
                })
                }
        
        </tbody>
            </table>


            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"absolute",zIndex:9, left:"5%",top:"2%", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>    
    </div>
  )
}

export default ClientsReport