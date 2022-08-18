export const EXAMPLE = "EXAMPLE";
export const USER = "USER";
export const USER_ROLE = "USER_ROLE";
export const USER_NAME = "USER_NAME";
export const USER_ID = "USER_ID";
export const LOGOUT = "LOGOUT";
export const ADD_LOCATION = "ADD_LOCATION";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_COMPANIES = "GET_COMPANIES";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_DEALERS = "GET_DEALERS";
export const GET_DEALERSALEPERSON = "GET_DEALERSALEPERSON";
export const GET_PRODUCERS = "GET_PRODUCERS";
export const GET_MANAGERS = "GET_MANAGERS";
export const GET_QUOTES = "GET_QUOTES";
export const GET_QUOTESTATUSES = "GET_QUOTESTATUSES";
export const GET_PAYMENTS = "GET_PAYMENTS";
export const GET_DEPOSITS = "GET_DEPOSITS";
export const GET_DAILYREPORTS = "GET_DAILYREPORTS";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const GET_USERS = "GET_USERS";


// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],
// : [],

export function example() {
  return {
    type: EXAMPLE,
  };
}
export function logout() {
  return {
    type: LOGOUT,
  };
}
export function user(user) {
  return {
    type: USER,
    payload: user,
  };
}

export function userRole(UserRole) {
  return {
    type: USER_ROLE,
    payload: UserRole,
  };
}
export function userName(UserName) {
  return {
    type: USER_NAME,
    payload: UserName,
  };
}

export function userId(UserId) {
  return {
    type: USER_ID,
    payload: UserId,
  };
}
export function addLocation(LocationId) {
  return {
    type: ADD_LOCATION,
    payload: LocationId,
  };
}





export function getLocations(data) {
  return {
    type: GET_LOCATIONS,
    payload: data,
  };
}

export function getCategories(data) {
  return {
    type: GET_CATEGORIES,
    payload: data,
  };
}

export function getCompanies(data) {
  return {
    type: GET_COMPANIES,
    payload: data,
  };
}

export function getClients(data) {
  return {
    type: GET_CLIENTS,
    payload: data,
  };
}

export function getDealers(data) {
  return {
    type: GET_DEALERS,
    payload: data,
  };
}

export function getDealerSalePerson(data) {
  return {
    type: GET_DEALERSALEPERSON,
    payload: data,
  };
}

export function getProducers(data) {
  return {
    type: GET_PRODUCERS,
    payload: data,
  };
}

export function getManagers(data) {
  return {
    type: GET_MANAGERS,
    payload: data,
  };
}

export function getUsers(data) {
  return {
    type: GET_USERS,
    payload: data,
  };
}

export function getQuotes(data) {
  return {
    type: GET_QUOTES,
    payload: data,
  };
}

export function getQuoteStatuses(data) {
  return {
    type: GET_QUOTESTATUSES,
    payload: data,
  };
}

export function getPayments(data) {
  return {
    type: GET_PAYMENTS,
    payload: data,
  };
}

export function getDailyReports(data) {
  return {
    type: GET_DAILYREPORTS,
    payload: data,
  };
}

export function getDeposits(data) {
  return {
    type: GET_DEPOSITS,
    payload: data,
  };
}