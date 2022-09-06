import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import QuoteModifyComponent from '../Components/quoteModify';

function QuoteModify(props) {
    const id = props.location.aboutProps
    const [quote, setQuote] = useState([])
    const [renew, setRenew] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [bound, setBound] = useState(false)
    const [reInstall, setReInstall] = useState(false)
    const [inputs, setInputs] = useState([])
    const [open, setOpen] = useState(false);
    const userId = useSelector(state=> state.UserId)
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    useEffect(() => {
        axios.get(`https://truewayagentBackend.com/idquotes`,{ params: { id: id } })
        .then(function(response){
            setQuote(response.data)
            
            setInputs({...inputs, QuoteId: id, UserId: userId})
            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [setQuote,userId])
    
    const checkRenew = () => {
        setBound(false)
        setInputs({...inputs, Status:"Renew down"})
        setCancel(false)
        setReInstall(false)
        setRenew(!renew)
    }
    const checkReinstall = () => {
        setBound(false)
        setInputs({...inputs, Status:"Re-install"})
        setCancel(false)
        setRenew(false)
        setReInstall(!false)
    }
    const checkBound = () => {
        setRenew(false)
        setInputs({...inputs, Status:"Sold"})
        setCancel(false)
        setReInstall(false)
        setBound(!bound)
    }
  
    const checkCancel = () => {
        setBound(false)
        setInputs({...inputs, Status:"Cancelled"})
        setRenew(false)
        setReInstall(false)
        setCancel(!cancel)
    }
    const submit = () =>{
        inputs.Status?
        fetch(`https://truewayagentBackend.com/modifyQuote`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify(inputs)
            
        })
        .then( onOpenModal()) 
       
        :
        alert("You must select a status")
        

    }
  
  
    return (
     <QuoteModifyComponent
        id={id}
        quote={quote}
        renew={renew}
        cancel={cancel}
        bound={bound}
        reInstall={reInstall}
        inputs={inputs}
        open={open}
        userId={userId}
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        setQuote={setQuote}
        setRenew={setRenew}
        setCancel={setCancel}
        setBound={setBound}
        setReInstall={setReInstall}
        setInputs={setInputs}
        setOpen={setOpen}
        checkRenew={checkRenew}
        checkReinstall={checkReinstall}
        checkBound={checkBound}
        checkCancel={checkCancel}
        submit={submit}
     /> 
    )
}

export default QuoteModify
