import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLocations,
  getCategories,
  getCompanies,
  getClients,
  getDealers,
  getDealerSalePerson,
  getProducers,
  getManagers,
  getUsers,
  getQuotes,
  getQuoteStatuses,
  getPayments,
  getDailyReports,
  getDeposits,
  avg,
  a_avg,
  getClientsID,
} from "../Redux/actions";

const date = new Date();
function sumarDias(fecha, dias){
  const date = new Date(fecha)
  date.setDate(date.getDate() + dias);
  return date;
}

let yearBy = date.getFullYear()
let monthBy =  ( (date.getMonth() + 1)>9?"-":"-0" ) + (date.getMonth() + 1)
let yearTo = date.getFullYear()
let monthTo = ( (date.getMonth() +2)>9?"-":"-0" ) + (date.getMonth()+2)

if(monthTo === '-13') {monthTo = '-01'; yearTo = date.getFullYear() + 1}

const FetchAll = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getProducer`)
    .then(function (response) {
      dispatch(getProducers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    axios
    .get(`https://truewayagentbackend.com/getUsersAverage?dateFrom=${yearBy}${( (date.getMonth() +1)>9?"-":"-0" )}${(date.getMonth()+1)}-01&dateTo=${yearTo}${monthTo}-01`)
    .then(function (response) {
      console.log(response.data)
      dispatch(a_avg(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    axios
    .get(`https://truewayagentbackend.com/getUsersAverage`)
    .then(function (response) {
      dispatch(avg(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

  axios
    .get(`https://truewayagentbackend.com/getCategories`)
    .then(function (response) {
      dispatch(getCategories(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  // axios
  //   .get(`https://truewayagentbackend.com/Quotes`)
  //   .then(function (response) {
  //     dispatch(getQuotes(response.data));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  axios
    .get(`https://truewayagentbackend.com/getLocations`)
    .then(function (response) {
      dispatch(getLocations(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getCompany`)
    .then(function (response) {
      dispatch(getCompanies(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/clients`)
    .then(function (response) {
      dispatch(getClients(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    axios
    .get(`https://truewayagentbackend.com/clientsLast`)
    .then(function (response) {
      dispatch(getClientsID(response.data));
      console.log('HOla')
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getManager`)
    .then(function (response) {
      dispatch(getManagers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getStatus`)
    .then(function (response) {
      dispatch(getQuoteStatuses(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getDeposit`)
    .then(function (response) {
      dispatch(getDeposits(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getDailyReports`)
    .then(function (response) {
      dispatch(getDailyReports(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getPayments`)
    .then(function (response) {
      dispatch(getPayments(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/Users`)
    .then(function (response) {
      dispatch(getUsers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getDealers`)
    .then(function (response) {
      dispatch(getDealers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  axios
    .get(`https://truewayagentbackend.com/getDealerSalePerson`)
    .then(function (response) {
      dispatch(getDealerSalePerson(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetCategories = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getCategories`)
    .then(function (response) {
      dispatch(getCategories(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetQuotes = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/Quotes`)
    .then(function (response) {
      dispatch(getQuotes(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetLocations = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getLocations`)
    .then(function (response) {
      dispatch(getLocations(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetCompany = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getCompany`)
    .then(function (response) {
      dispatch(getCompanies(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetA_AVG = (dispatch) => {

  axios
  .get(`https://truewayagentbackend.com/getUsersAverage?dateFrom=${yearBy}${( (date.getMonth() +1)>9?"-":"-0" )}${(date.getMonth()+1)}-01&dateTo=${yearTo}${monthTo}-01`)
  .then(function (response) {
    console.log(response.data)
    dispatch(a_avg(response.data));
  })
  .catch((error) => {
    console.log(error);
  });
}

const GetClients = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/clients`)
    .then(function (response) {
      dispatch(getClients(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetClientsId = (dispatch) => {
axios
.get(`https://truewayagentbackend.com/clientsLast`)
.then(function (response) {
  dispatch(getClientsID(response.data));
  console.log('HOla')
})
.catch((error) => {
  console.log(error);
});
};

const GetProducer = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getProducer`)
    .then(function (response) {
      dispatch(getProducers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetManager = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getManager`)
    .then(function (response) {
      dispatch(getManagers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetQuoteStatuses = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getStatus`)
    .then(function (response) {
      dispatch(getQuoteStatuses(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetDeposit = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getDeposit`)
    .then(function (response) {
      dispatch(getDeposits(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetDailyReports = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getDailyReports`)
    .then(function (response) {
      dispatch(getDailyReports(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetPayments = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getPayments`)
    .then(function (response) {
      dispatch(getPayments(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetUsers = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/Users`)
    .then(function (response) {
      dispatch(getUsers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetDealers = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getDealers`)
    .then(function (response) {
      dispatch(getDealers(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetDealerSalePerson = (dispatch) => {
  axios
    .get(`https://truewayagentbackend.com/getDealerSalePerson`)
    .then(function (response) {
      dispatch(getDealerSalePerson(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  FetchAll,
  GetCategories,
  GetQuotes,
  GetLocations,
  GetCompany,
  GetClients,
  GetProducer,
  GetManager,
  GetQuoteStatuses,
  GetDeposit,
  GetDailyReports,
  GetPayments,
  GetUsers,
  GetDealers,
  GetDealerSalePerson,
  GetClientsId,
  GetA_AVG,
};
