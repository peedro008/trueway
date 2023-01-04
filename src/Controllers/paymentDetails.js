import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PaymentDetailsComponent from '../Components/paymentDetails'


function PaymentDetails(props) {

    const id = props.location.aboutProps
    const [payment, setPayment] = useState([])
    useEffect(() => {
        axios.get(`https://truewayagentbackend.com/idPayment?id=${id}`)
        .then(function(response){
            setPayment(response.data)
        

            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [id])

    return (
        <PaymentDetailsComponent 
        payment={payment}
        id={id}
        />
    )
}

export default PaymentDetails
