import React from 'react';
import AdminDash from './adminDash';
import AdminNav from "./adminNav"
import Report from './report';
// import Balances from './Balances';
 import Producer from './producer';
import ProducerEdit from './producerEdit';
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
import PayReport from './payReport';
import QuoteReport from "./quoteReport"

import {
    BrowserRouter as Router,
    
    Route} from 'react-router-dom'
import DepositCash from './depositCash';
import DailyReport from './dailyReport';
import ClientsReport from './clientsReport';
import ClientEdit from './clientEdit';
import Users from './users';
import Managers from './managers';
import ManagerDetails from './managerDetails';
import ManagerEdit from './managerEdit';
 const AdminRouter=()=>{

    return (
        <Router>
          <Route component={AdminNav}/>
          <Route exact path='/' component={AdminDash}/>
          <Route exact path='/payments' component={Payments}/>
          <Route exact path='/payments/pay' component={Payment}/>
          <Route exact path="/payments/deposit" component={DepositCash}/>
          <Route exact path='/manager' component={Manager}/>
          <Route exact path='/manager/managerC' component={ManagerC}/>
          <Route exact path='/manager/managerL' component={ManagerL}/>
          <Route exact path='/manager/managerM' component={ManagerM}/>
          <Route exact path='/manager/managerP' component={ManagerP}/>
          <Route exact path='/manager/managerD' component={ManagerD}/>
          <Route exact path='/manager/managerCa' component={ManagerCa}/>
          <Route exact path='/users/producers' component={Producer}/>
          <Route exact path='/users/manager' component={Managers}/>
          <Route exact path='/users' component={Users}/>
          <Route exact path='/users/manager/details' component={ManagerDetails}/>
          <Route exact path='/users/producers/edit' component={ProducerEdit}/>
          <Route exact path='/users/manager/edit' component={ManagerEdit}/>
          <Route exact path='/users/producers/details' component={ProducerDetails}/>
          <Route exact path='/report' component={Report}/>
          <Route exact path='/report/filter' component={AdminFilter}/>
          <Route exact path='/report/quoteReport' component={QuoteReport}/>
          <Route exact path='/report/payReport' component={PayReport}/>
          <Route exact path='/report/quote' component={QuoteDetails}/>
          <Route exact path='/report/modifyquote' component={ModifyQuote}/>
          <Route exact path='/addquote' component={AddQuote}/>
          <Route exact path='/payments/dailyReport' component={DailyReport}/>
          <Route exact path='/report/clients' component={ClientsReport}/>
          <Route exact path='/report/clientedit' component={ClientEdit}/>
         {/*  <Route exact path='/producer/info' component={ProducerInfo}/>
          <Route exact path='/balances' component={Balances}/>
          <Route exact path='/filter' component={AdminFilter}/>
        
          <Route exact path='/addCompany' component={AddCompany}/>
         
          <Route exact path='/deposit' component={DepositCash}/>clientsReportClientEdit
         
          <Route exact path='/addquote' component={ProducerAddQuote}/> */}
        </Router>
      );
    }



export default AdminRouter