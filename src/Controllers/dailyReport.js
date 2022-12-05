import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DailyReportComponent from '../Components/dailyReport';

import { addLocation, getDailyReports } from '../Redux/actions';

function DailyReport() {
    const [payments, setPayments] = useState([])
    const [yPayments, setYPayments] = useState([])
    const [cash, setCash] = useState(0)
    const [credit, setCredit] = useState(0)
    const [EFT, setEFT] = useState(0)
    const [producers, setProducers] = useState([])
    const [search, setSearch] = useState("")
    const [date, setDate ] = useState("")
    const UserId = useSelector(state=> state.UserId)
    const LocationId= useSelector(state=>state.LocationId)
    const [total, setTotal] =useState(0)
    const [ay, setAy]=useState(0)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => window.history.go(-1);
    const [yesterday, setYesterday]=useState(false)

   
    useEffect(() => {
        axios.get(`https://truewayagentbackend.com//dailyReport?LocationId=${LocationId}`)
        .then(function(response){
            setPayments(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [LocationId,UserId])
       
    useEffect(() => {
        axios.get(`https://truewayagentbackend.com//dailyReport?LocationId=${LocationId}&yesterday=true`)
        .then(function(response){
            setYPayments(response.data)
            
        })
        .catch(error=>{
          console.log(error)  
        })
    }, [LocationId,UserId])
    useEffect(()=>{
        let CA=0
        let CR=0
        let EF=0
        let paz = yesterday?yPayments:payments
        paz.map(e=>{
            e.method=="Cash"?
            CA+=parseFloat(e.amount) +
            parseFloat(e.PIPvalue) +
            parseFloat(e.NSDvalue) +
            parseFloat(e.MVRvalue) +
            parseFloat(e.creditCardFee):
            e.method=="EFT"?
            EF+=parseFloat(e.amount) +
            parseFloat(e.PIPvalue) +
            parseFloat(e.NSDvalue) +
            parseFloat(e.MVRvalue) +
            parseFloat(e.creditCardFee):
            CR+=parseFloat(e.amount) +
            parseFloat(e.PIPvalue) +
            parseFloat(e.NSDvalue) +
            parseFloat(e.MVRvalue) +
            parseFloat(e.creditCardFee)
        })
        setCash(CA)
        setCredit(CR)
        setEFT(EF)
    },[payments, yesterday, yPayments])
    let pes = []
    let DATE = ""
    useEffect(()=>{
           payments.map(e=>{
            if(!pes.filter(f=>f.name==e.User.name).length){
                pes.push({name: e.User.name, location: e.Location.name})
            }
        
           })
     
       setProducers(pes)
       payments.map(e=>{
        if(!DATE){
            DATE = e.date
        }
    setDate(DATE)
       })
    },[payments])
        useEffect(()=>{
          
           setTotal(cash+credit+EFT)


            
          
        },[cash,credit,EFT])

       
    let onSubmit = ()=>{
        let IDs = (yesterday?yPayments:payments).map(e=>{return e.id})
        console.log({LocationId:LocationId, IDs:IDs, total:total })
        fetch(`https://truewayagentbackend.com//addDailyReport`, {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({LocationId:LocationId, IDs:IDs, total:total  }),
            
        })
        getDailyReports(dispatch)
        onOpenModal();
        
     
    }
    
  return (
    <DailyReportComponent 
        onSubmit={onSubmit}
        payments={payments}
        cash={cash}
        credit={credit}
        EFT={EFT}
        producers={producers}
        search={search}
        date={date}
        total={total}
        ay={ay}
        setPayments={setPayments}
        yPayments={yPayments}
setYPayments={setYPayments}
        setCash={setCash}
        yesterday={yesterday}
setYesterday={setYesterday}
        setCredit={setCredit}
        setEFT={setEFT}
        setProducers={setProducers}
        setSearch={setSearch}
        setDate={setDate}
        setTotal={setTotal}
        setAy={setAy}
        open={open}
setOpen={setOpen}
onOpenModal={onOpenModal}
onCloseModal={onCloseModal}

    />
  )
}

export default DailyReport