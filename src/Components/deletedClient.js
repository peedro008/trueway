import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import {AiOutlineDelete} from "react-icons/ai"
import SearchField from "react-search-field";
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import {FiRefreshCcw} from "react-icons/fi"
function DeletedClients() {
    const [clients, setClients] = useState([])
    const [deleteConf, setDeleteConf] = useState("")
    const [deletedOne, setDeletedOne] = useState(null)
    const [search, setSearch] = useState("")
    const userRole = useSelector(state=> state.userRole)
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const handleDelete = (e)=>{
        setDeletedOne(e)
        onOpenModal()
    }
    useEffect(() => {
        axios.get(`https://truewayagentbackend.com/getDeletedClients`)
        .then(function(response){
            setClients(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [])
    const handleDeleteModal = (e)=>{
        deleteClient({ClientId:deletedOne})
        window.location.reload()

    }
    const deleteClient = (data) => {
        data&&
        console.log(data)
        fetch(`https://truewayagentbackend.com/undeleteClient`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data)
            
        })
        .then(async res => { 
            
            try {
            const jsonRes = await res.json();
            
            if (res.status !== 200) {
                console.log("error")
            } else {
               
               console.log(jsonRes)
              
              
                
            }
        } catch (err) {
            console.log(err);
        };
    
    })
      
        .catch(err => {
            console.log(err);
        });
        };
        
  return (
    <div className='genericDiv1'>
        <div className="genericHeader">
                <p className="genericTitle">Deleted Client list</p>
        </div>
        <div className="REPcontrol">
       
        <div className="REPsearch">
         <SearchField 
            classNames="pepe"
            placeholder='Search item'
            onChange={setSearch}
        /></div>

                </div>
           <table class="table2" style={{minWidth:"80vw"}}>
      
        <tbody>
            <tr>
                <th scope="col" className="column1"><p   className="REPtype">Client name</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Client email</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Client phone</p></th>
                <th scope="col" className="column1"><p   className="REPtype">New</p></th>
                <th scope="col" className="column1"><p   className="REPtype">Notes</p></th>
                
              
                {userRole!=="Producer"&&<th scope="col" className="column1"><p   className="REPtype">Reset Client</p></th>
                }

            </tr>
            {
                !search?
                clients.sort(function(a,b){return b.id-a.id}).map((e)=>{
                   
                   return (
                       
                            <tr>
                            
                            <td className="ClientName" scope="row">
                               
                                    {e.name}
                               
                            </td>
                            <td className="ClientName" scope="row">
                            {e.email}
                                   
                            </td>    
                                           
                            <td className="ClientName" scope="row">
                            {e.tel}
                                   
                                </td>  
                                <td className="ClientName" scope="row">
                            {e.new?"true":"false"}
                                   
                                </td>  
                                <td className="ClientName" style={{textOverflow:"ellipsis",overflow:"hidden", maxWidth:"100px"}} scope="row">
                            {e.notes}
                                   
                                </td>       
                           
                                {userRole!=="Producer"&&
                                     <td className="ClientName" scope="row"  >
                                          <div style={{height:"auto",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
                                            <FiRefreshCcw className='deleteIcon' size={"20px"} onClick={()=>{handleDelete(e.id)}}/>
                                            </div>
                                        </td>
                                }
                        </tr>
                     
                     
                     
                     
                     )
                     
                    
                    })

                :
                (clients.filter(e=>(e.name.toLowerCase()).includes(search.toLowerCase())   )).sort(function(a,b){return b.id-a.id}).map((e)=>{
                    return (
                        <tr>
                             
                            <td className="ClientName" scope="row"><NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }}
                                 to={{
                                    pathname:("/report/clientedit"),
                                    aboutProps:e}}>{e.name}</NavLink></td>
                            <td className="ClientName" scope="row"> <NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }}
                                 to={{
                                    pathname:("/report/clientedit"),
                                    aboutProps:e}}>{e.email}</NavLink></td>           
                            <td className="ClientName" scope="row"><NavLink style={{ textDecoration: 'none', color:"#000", color:"black" }}
                                 to={{
                                    pathname:("/report/clientedit"),
                                    aboutProps:e}}>{e.tel}</NavLink></td>  
                               
                               <td className="ClientName" scope="row">
                            {e.new?"true":"false"}
                                   
                                </td>  
                                <td className="ClientName" style={{textOverflow:"ellipsis",overflow:"hidden", maxWidth:"100px"}} scope="row">
                            {e.notes}
                                   
                                </td>       
                                <td className="ClientName" scope="row" >
                            <NavLink style={{ textDecoration: 'none', color:"#000", color:"black",  }}
                                 to={{
                                    pathname:("/payments/pay"),
                                    aboutProps:e.id}}>
                                        <div style={{height:"auto",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
                                        <div className='paymentIcon'/></div>
                                    </NavLink>
                                </td>  
                                               
                                <td className="ClientName" scope="row"  >
                            <NavLink style={{ textDecoration: 'none', color:"#000", color:"black",  }}
                                 to={{
                                    pathname:("/report/clientedit"),
                                    aboutProps:e}}>
                                        <div style={{height:"auto",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
                                        <div className='editIcon'/></div>
                                    </NavLink>
                                </td>  
                                {userRole!=="Producer"&&
                                     <td className="ClientName" scope="row"  >
                                          <div style={{height:"auto",display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center" }}>
                                            <FiRefreshCcw className='deleteIcon' size={"20px"} onClick={()=>{handleDelete(e.id)}}/>
                                            </div>
                                        </td>
                                }
                        </tr>
                     
                     
                     
                     
                     )
                     
                })
                }
        
        </tbody>
            </table>


            <BsChevronLeft color="grey" style={{minWidth:"30px", minHeight:"30px", position:"fixed",zIndex:9, left:"80px",top:"17px", alignSelf:"flex-start"}} onClick={()=>window.history.go(-1)}/>    
    
    
            <Modal open={open} onClose={onCloseModal} center classNames={"modal"} >
                    <div className="modal" style={{minWidth:"250px", alignItems:"center"}}>
                    
                    <FiRefreshCcw color="#14B8A6" size={"50px"} style={{alignSelf:"center", marginTop:"25px", marginBottom:"10px"}}/>
                    <p className="modalText">Type "reset" to confirm </p>
                    <input className='AQinput' onChange={(e)=>setDeleteConf(e.target.value)} style={{marginTop:"12px"}}/>
                
                    <button disabled={deleteConf=="reset"?false:true} className="modalButton" onClick={handleDeleteModal}>Continue</button>
                
                    
                    </div>
            </Modal>
    
    
    
    
    </div>
  )
}

export default DeletedClients
