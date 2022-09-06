import React from "react";
import AdminNav from "../Navs/adminNav";
import Management from "../Components/management";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ManagementCompany from "../Controllers/managementCompany";
import ManagementCategory from "../Controllers/managementCategory";
import ManagementClient from "../Controllers/managementClient";
import ManagementLocation from "../Controllers/managementLocation";
import ManagementDealer from "../Controllers/managementDealer";
import ManagementDealerSalePerson from "../Controllers/managementDealerSalePerson";
import ManagementProducer from "../Controllers/managementProducer";
import ManagementManager from "../Controllers/managementManager";
import ReportsLobby from "../Components/reportsLobby";
import PaymentsLobby from "../Components/paymentsLobby";
import UsersLobby from "../Components/usersLobby";
import DeletedLobby from "../Components/deletedLobby";
import AddPayment from "../Controllers/addPayment";
import DepositCash from "../Controllers/depositCash";
import DailyReport from "../Controllers/dailyReport";
import ProducerReport from "../Controllers/producersReport";
import ManagerReport from "../Controllers/managerReport";
import AddQuote from "../Controllers/addQuote";
import QuoteFilter from "../Components/quoteFilter";
import QuoteReport from "../Controllers/quoteReport";
import PaymentReport from "../Controllers/paymentReport";
import ClientReport from "../Controllers/clientReport";
import DealerReport from "../Controllers/dealerReport";
import DRreport from "../Controllers/DRreport";
import DRdetails from "../Controllers/DRdetails";
import QuoteDetails from "../Controllers/quoteDetails";
import QuoteModify from "../Controllers/quoteModify";
import DepositReport from "../Controllers/depositReport";
import DeletedQuote from "../Controllers/deletedQuotes";
import DeletedPayments from "../Controllers/deletedPayments";
import DeletedClients from "../Controllers/deletedClients";
import DeletedManagers from "../Controllers/deletedManager";
import DeletedProducers from "../Controllers/deletedProducer";
import AdminDashboard from "../Controllers/adminDashboard";
import ManagerDetails from "../Controllers/managerDetails";
import ProducerDetails from "../Controllers/producerDetails";
import ProducerEdit from "../Controllers/producerEdit";
import ManagerEdit from "../Controllers/managerEdit";
import ClientEdit from "../Controllers/clientEdit";
import PaymentDetails from "../Controllers/paymentDetails";
import Stadistic from "../Controllers/stadistic";
import GenericReport from "../Controllers/genericReport";

const AdminRouter = () => {
  return (
    <Router>
      <Route component={AdminNav} />
      <Route exact path='/' component={AdminDashboard}/>
      <Route exact path='/stadistic' component={Stadistic}/>
      <Route exact path="/management" component={Management} />
      <Route exact path="/report" component={ReportsLobby} />
      <Route exact path="/report/Deleted" component={DeletedLobby} />
      <Route exact path="/payments" component={PaymentsLobby} />
      <Route exact path="/users" component={UsersLobby} />
      <Route exact path="/management/Company" component={ManagementCompany} />
      <Route exact path="/management/Category" component={ManagementCategory} />
      <Route exact path="/management/Dealer" component={ManagementDealer} />
      <Route exact path="/management/DealerSalePerson" component={ManagementDealerSalePerson}/>
      <Route exact path="/management/Client" component={ManagementClient} />
      <Route exact path="/management/Location" component={ManagementLocation} />
      <Route exact path="/management/Producer" component={ManagementProducer} />
      <Route exact path="/management/Manager" component={ManagementManager} />
      <Route exact path="/payments/pay" component={AddPayment} />
      <Route exact path="/payments/deposit" component={DepositCash} />
      <Route exact path="/payments/dailyReport" component={DailyReport} />
      <Route exact path="/users/producers" component={ProducerReport} />
      <Route exact path='/users/manager' component={ManagerReport}/>
      <Route exact path='/addquote' component={AddQuote}/>
      <Route exact path='/report/filter' component={QuoteFilter}/>
      <Route exact path='/report/quoteReport' component={QuoteReport}/>
      <Route exact path='/report/paymentReport' component={PaymentReport}/>
      <Route exact path='/report/clients' component={ClientReport}/>
      <Route exact path='/report/clientedit' component={ClientEdit}/>
      <Route exact path='/report/DealerReport' component={DealerReport}/>
      <Route exact path='/report/dailyReport' component={DRreport}/>
      <Route exact path='/report/dailyReport/details' component={DRdetails}/>
      <Route exact path='/report/quote' component={QuoteDetails}/>
      <Route exact path='/report/modifyquote' component={QuoteModify}/>
      <Route exact path='/report/depositReport' component={DepositReport}/> 
      <Route exact path='/report/Deleted/quotes' component={DeletedQuote}/>
      <Route exact path='/report/Deleted/payments' component={DeletedPayments}/>
      <Route exact path='/report/Deleted/clients' component={DeletedClients}/>
      <Route exact path='/report/Deleted/Managers' component={DeletedManagers}/>
      <Route exact path='/report/Deleted/Producers' component={DeletedProducers}/>
      <Route exact path='/users/manager/details' component={ManagerDetails}/>
      <Route exact path='/users/producers/details' component={ProducerDetails}/>
      <Route exact path='/users/producers/edit' component={ProducerEdit}/>
      <Route exact path='/users/manager/edit' component={ManagerEdit}/>
      <Route exact path='/report/payment/details' component={PaymentDetails}/>
      <Route exact path='/report/genericReport' component={GenericReport}/>
    </Router>
  );
};

export default AdminRouter;
