import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DepositCashComponent from "../Components/depositCash";


const DepositCash = () => {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [box, setBox] = useState({pay1:"",pay5:"",pay10:"",pay20:"",pay50:"",pay100:""})
    const [dbPayments, setDbPayments] = useState([])
    const [total, setTotal] = useState(0)
    const [id, setId] = useState([])
    
    const UserId= useSelector(state=>state.UserId)
    const LocationId= useSelector(state=>state.LocationId)
    const [note, setNote] = useState("")
 

    useEffect(()=>{
        axios.get(`https://truewayagentBackend.com/getCashPayment?LocationId=${LocationId}`)
        .then(function(response){
            setDbPayments(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    
    },[])

    useEffect(()=>{
        let amount = 0  
        dbPayments.map(e=>amount +=parseFloat(e.amount)+parseFloat(e.creditCardFee)+parseFloat(e.PIPvalue)+parseFloat(e.MVRvalue)+parseFloat(e.NSDvalue))
        setTotal(amount)
        let ids = []
        dbPayments.map(e=>ids.push(e.id))
        setId(ids)
    },[dbPayments])

    const submit = () =>{
        let data = {id:id, UserId: UserId, LocationId: LocationId, note: note, total: total}
        onOpenModal()
        fetch(` https://truewayagentBackend.com/deposit`, {
                    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(data),
            
        })
     
    }
  
    return(
        <DepositCashComponent
            open={open}
            box={box}
            setBox={setBox}
            submit={submit}
            dbPayments={dbPayments}
            total={total}
            id={id}
            note={note}
            setNote={setNote}
            onCloseModal={onCloseModal}
        />
    )
}

export default DepositCash