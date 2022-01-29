import React from 'react';
import AdminDash from './adminDash';
import AdminNav from "./adminNav"
import Report from './report';
// import Balances from './Balances';
 import Producer from './producer';

// import AddCompany from './addCompany';
 import Payments from "./payments"
 import Payment from './payment';
// import DepositCash from "./depositCash"
import AdminFilter from "./adminFilter"
import Manager from './manager';
import ManagerM from './managerM';
import ManagerP from "./managerP"
import ManagerL from './managerL';
import ManagerC from './managerC';
import ManagerD from './managerD';
import ProducerDetails from "./producerDetails"
import QuoteDetails from "./quoteDetails"
import ModifyQuote from './modifyQuote';
import AddQuote from './addQuote';
import ManagerCa from './managerCa';

import {
    BrowserRouter as Router,
    
    Route} from 'react-router-dom'
 const AdminRouter=()=>{

    return (
        <Router>
          <Route component={AdminNav}/>
          <Route exact path='/' component={AdminDash}/>
          <Route exact path='/payments' component={Payments}/>
          <Route exact path='/payment' component={Payment}/>
          <Route exact path='/manager' component={Manager}/>
          <Route exact path='/managerC' component={ManagerC}/>
          <Route exact path='/managerL' component={ManagerL}/>
          <Route exact path='/managerM' component={ManagerM}/>
          <Route exact path='/managerP' component={ManagerP}/>
          <Route exact path='/managerD' component={ManagerD}/>
          <Route exact path='/managerCa' component={ManagerCa}/>
          <Route exact path='/producers' component={Producer}/>
          <Route exact path='/producer/details' component={ProducerDetails}/>
          <Route exact path='/filter' component={AdminFilter}/>
          <Route exact path='/filter/report' component={Report}/>
          <Route exact path='/quote' component={QuoteDetails}/>
          <Route exact path='/modifyquote' component={ModifyQuote}/>
          <Route exact path='/addquote' component={AddQuote}/>
         {/*  <Route exact path='/producer/info' component={ProducerInfo}/>
          <Route exact path='/balances' component={Balances}/>
          <Route exact path='/filter' component={AdminFilter}/>
        
          <Route exact path='/addCompany' component={AddCompany}/>
         
          <Route exact path='/deposit' component={DepositCash}/>
         
          <Route exact path='/addquote' component={ProducerAddQuote}/> */}
        </Router>
      );
    }



export default AdminRouter