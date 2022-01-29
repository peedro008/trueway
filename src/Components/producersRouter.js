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
// import MyQuotes from './myQuotes';
 const ProducerRouter=()=>{


    return (
        <Router>
          <Route component={ProducerNav}/>
          <Route exact path='/' component={ProducerDash}/>
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