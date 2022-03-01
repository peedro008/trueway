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
// import MyQuotes from './myQuotes';
 const ProducerRouter=()=>{


    return (
        <Router>
          <Route component={ProducerNav}/>
          <Route exact path='/' component={ProducerDash}/>
          <Route exact path='/payments' component={Payments}/>
          <Route exact path='/payment' component={Payment}/>
          <Route exact path="/deposit" component={DepositCash}/>
          <Route exact path='/dailyReport' component={DailyReport}/>
          <Route exact path='/profile' component={ProducerPerfil}/>
          <Route exact path='/report' component={Report}/>
          <Route exact path='/filter' component={AdminFilter}/>
          <Route exact path='/quoteReport' component={QuoteReport}/>
          <Route exact path='/payReport' component={PayReport}/>
          <Route exact path='/quote' component={QuoteDetails}/>
          <Route exact path='/modifyquote' component={ModifyQuote}/>
          <Route exact path='/addquote' component={AddQuote}/>
          <Route exact path='/clients' component={ClientsReport}/>
          <Route exact path='/clientedit' component={ClientEdit}/>
           {/* <Route exact path='/myquotes/report' component={MyQuotes}/> 
          <Route exact path='/myquotes' component={ProducerFilter}/>
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