import React from 'react';

import {
    BrowserRouter as Router,
    
    Route} from 'react-router-dom'

import ProducerNav from '../Navs/producerNav';
import ProducerDashboard from '../Controllers/producerDashboard'
import Management from '../Components/management';
import ReportsLobby from '../Components/reportsLobby';
import PaymentsLobby from '../Components/paymentsLobby';
import ProducerDetails from '../Controllers/producerDetails';
import ManagementDealer from '../Controllers/managementDealer';
import ManagementDealerSalePerson from '../Controllers/managementDealerSalePerson';
import ManagementClient from '../Controllers/managementClient';
import ClientEdit from '../Controllers/clientEdit';
import AddPayment from '../Controllers/addPayment';
import DepositCash from '../Controllers/depositCash';
import DailyReport from '../Controllers/dailyReport';
import AddQuote from "../Controllers/addQuote";
import QuoteFilter from "../Components/quoteFilter";
import QuoteReport from "../Controllers/quoteReport";
import PaymentReport from "../Controllers/paymentReport";
import ClientReport from "../Controllers/clientReport";
import DealerReport from "../Controllers/dealerReport";
import DRreport from '../Controllers/DRreport';
import DRdetails from '../Controllers/DRdetails';
import QuoteDetails from '../Controllers/quoteDetails';
import QuoteModify from '../Controllers/quoteModify';
import DepositReport from '../Controllers/depositReport';
import PaymentDetails from "../Controllers/paymentDetails";
 const ProducerRouter=()=>{


    return (
        <Router>
          <Route component={ProducerNav}/>
          <Route exact path="/" component={ProducerDashboard}/>
          <Route exact path="/management" component={Management} />
          <Route exact path="/report" component={ReportsLobby} />
          <Route exact path="/payments" component={PaymentsLobby} />
          <Route exact path="/profile" component={ProducerDetails} />
          <Route exact path="/management/Dealer" component={ManagementDealer} />
          <Route exact path="/management/DealerSalePerson" component={ManagementDealerSalePerson}/>
          <Route exact path="/management/Client" component={ManagementClient} />
          <Route exact path='/report/clientedit' component={ClientEdit}/>
          <Route exact path="/payments/pay" component={AddPayment} />
          <Route exact path="/payments/deposit" component={DepositCash} />
          <Route exact path="/payments/dailyReport" component={DailyReport} />
          <Route exact path='/report/filter' component={QuoteFilter}/>
          <Route exact path='/report/quoteReport' component={QuoteReport}/>
          <Route exact path='/report/paymentReport' component={PaymentReport}/>
          <Route exact path='/report/clients' component={ClientReport}/>
          <Route exact path='/report/DealerReport' component={DealerReport}/>
          <Route exact path='/report/dailyReport' component={DRreport}/>
          <Route exact path='/report/dailyReport/details' component={DRdetails}/>
          <Route exact path='/report/quote' component={QuoteDetails}/>
          <Route exact path='/report/modifyquote' component={QuoteModify}/>
          <Route exact path='/report/depositReport' component={DepositReport}/> 
          <Route exact path='/addquote' component={AddQuote}/>
          <Route exact path='/report/payment/details' component={PaymentDetails}/>
          
        </Router>
      );
    }



export default ProducerRouter