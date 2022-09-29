import {
  USER,
  SESSION_DATE,
  USER_ROLE,
  USER_NAME,
  USER_ID,
  LOGOUT,
  ADD_LOCATION,
  GET_CATEGORIES,
  GET_COMPANIES,
  GET_CLIENTS,
  GET_DEALERS,
  GET_DEALERSALEPERSON,
  GET_PRODUCERS,
  GET_MANAGERS,
  GET_QUOTES,
  GET_QUOTESTATUSES,
  GET_PAYMENTS,
  GET_DEPOSITS,
  GET_DAILYREPORTS,
  GET_LOCATIONS,
  GET_USERS,
} from "./actions";

const initialState = {
  TotalDeposit: 0,
  User: null,
  userRole: null,
  UserId: null,
  userName: null,
  LocationId: null,
  Locations: [],
  Categories: [],
  Companies: [],
  Clients: [],
  Producers: [],
  Users: [],
  Quotes: [],
  Dealers: [],
  DealerSalesPersons: [],
  Payments: [],
  DailyReports: [],
  Deposits: [],
  Managers: [],
  QuoteStatuses: [],
  SessionDate: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER:
      return {
        ...state,
        User: action.payload,
      };
    case USER_ROLE:
      return {
        ...state,
        userRole: action.payload,
      };
      case SESSION_DATE:
      return {
        ...state,
        SessionDate: action.payload,
      };
    case USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case USER_ID:
      return {
        ...state,
        UserId: action.payload,
      };
    case LOGOUT:
      return {
        userRole: null,
      };

    case ADD_LOCATION:
      return {
        ...state,
        LocationId: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        Categories: action.payload,
      };
    case GET_LOCATIONS:
      return {
        ...state,
        Locations: action.payload,
      };
    case GET_COMPANIES:
      return {
        ...state,
        Companies: action.payload,
      };
    case GET_CLIENTS:
      return {
        ...state,
        Clients: action.payload,
      };
    case GET_PRODUCERS:
      return {
        ...state,
        Producers: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        Users: action.payload,
      };
    case GET_QUOTES:
      return {
        ...state,
        Quotes: action.payload,
      };
    case GET_DEALERS:
      return {
        ...state,
        Dealers: action.payload,
      };
    case GET_DEALERSALEPERSON:
      return {
        ...state,
        DealerSalesPersons: action.payload,
      };
    case GET_PAYMENTS:
      return {
        ...state,
        Payments: action.payload,
      };
    case GET_DAILYREPORTS:
      return {
        ...state,
        DailyReports: action.payload,
      };
    case GET_DEPOSITS:
      return {
        ...state,
        Deposits: action.payload,
      };
    case GET_MANAGERS:
      return {
        ...state,
        Managers: action.payload,
      };
    case GET_QUOTESTATUSES:
      return {
        ...state,
        QuoteStatuses: action.payload,
      };

    default:
      return state;
  }
}
