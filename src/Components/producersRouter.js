import React from 'react';
import ProducerDash from './producerDash';
// import ProducerAddQuote from "./producerAddQuote"
// import ProducerFilter from './producerFilter';
// import Payment from './payment';
// import Payments from './payments';
// import Manager from './manager';
// import ManagerM from './managerM';
// import ManagerP from "./managerP"
// import ManagerL from './managerL';
// import ManagerC from './managerC';
// import DepositCash from './depositCash';
import {
    BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom'
import ManagerClient from './managerClient';
import ProducerNav from './producerNav';
import Payments from './payments';
import Payment from './payment';
import DepositCash from './depositCash';
import DailyReport from './dailyReport';
import ProducerPerfil from './ProducersComponents/ProducerPerfil';
import Report from './report';
import AdminFilter from './adminFilter';
import QuoteReport from './quoteReport';
import PayReport from './payReport';
import QuoteDetails from './quoteDetails';
import ModifyQuote from './modifyQuote';
import AddQuote from './addQuote';
import ClientsReport from './clientsReport';
import ClientEdit from './clientEdit';
import ProducerDetails from './producerDetails';
import Deposits from './deposits';
import DailyDetails from './dailyDetails';
import DailyReReport from './dailyReReport';

// import MyQuotes from './myQuotes';
 const ProducerRouter=()=>{


    return (
        <Router>
          <Route component={ProducerNav}/>
          <Route exact path='/' component={ProducerDash}/>
          <Route exact path='/payments' component={Payments}/>
         
          <Route exact path="/deposit" component={DepositCash}/>
          <Route exact path='/dailyReport' component={DailyReport}/>
          <Route exact path='/profile' component={ProducerPerfil}/>
          <Route exact path='/report' component={Report}/>
          <Route exact path='/report/filter' component={AdminFilter}/>
          <Route exact path='/report/quoteReport' component={QuoteReport}/>
          <Route exact path='/report/payReport' component={PayReport}/>
          <Route exact path='/report/quote' component={QuoteDetails}/>
          <Route exact path='/report/dailyReport' component={DailyReReport}/>
          <Route exact path='/report/dailyReport/details' component={DailyDetails}/>
          <Route exact path='/report/modifyquote' component={ModifyQuote}/>
          <Route exact path='/addquote' component={AddQuote}/>
          <Route exact path='/report/clients' component={ClientsReport}/>
          <Route exact path='/report/clientedit' component={ClientEdit}/>
          <Route exact path='/clientedit' component={ClientEdit}/>
          <Route exact path='/payments/pay' component={Payment}/>
          <Route exact path="/payments/deposit" component={DepositCash}/>
          <Route exact path='/payments/dailyReport' component={DailyReport}/>
          <Route exact path='/producers/details' component={ProducerDetails}/>
          <Route exact path='/addClient' component={ManagerClient}/> 
          <Route exact path='/report/depositReport' component={Deposits}/>
          {/*<Route exact path='/myquotes' component={ProducerFilter}/>
          <Route exact path='/add' component={ProducerAddQuote}/>
          <Route exact path='/payments' component={Payments}/>
          <Route exact path='/deposit' component={DepositCash}/>
          <Route exact path='/payment' component={Payment}/>
          <Route exact path='/manager' component={Manager}/>
          <Route exact path='/managerC' component={ManagerC}/>
          <Route exact path='/managerL' component={ManagerL}/>
          <Route exact path='/managerM' component={ManagerM}/>
          <Route exact path='/managerP' component={ManagerP}/> */}
        </Router>
      );
    }



export default ProducerRouter