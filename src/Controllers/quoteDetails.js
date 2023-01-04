import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QuoteDetailsComponent from '../Components/quoteDetails'

function QuoteDetails(props) {
    const id = props.location.aboutProps.ID
    const [quote, setQuote] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/idquotes?id=${id}`)
        .then(function(response){
            setQuote(response.data)
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [id])

    return (
        <QuoteDetailsComponent 
        quote={quote}
        id={id}
        />
    )
}

export default QuoteDetails
