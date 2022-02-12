import { 
    EXAMPLE, USER, USER_ROLE,USER_NAME, USER_ID, LOGOUT, ADD_PAY
     } from './actions'
  
  const initialState = {
 
  TotalDeposit:0,
  example:0,
  User:null,
  userRole:null,
  UserId:null,
  userName:null,
  
  
  }
  
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case EXAMPLE:// booleano para identificar al user al hacer el login si es admin o cliente
        return{
          ...state,
          example: state.example+1
        }
      case USER:
        return{
          ...state,
          User: action.payload
        }
        case USER_ROLE:
          return{
            ...state,
            userRole: action.payload
          }
          case USER_NAME:
            return{
              ...state,
              userName: action.payload
            }
            case USER_ID:
              return{
                ...state,
                UserId:action.payload
              }
              case LOGOUT:
                return{
                  ...state,
                 
                  userRole:null,
                
                }

            case ADD_PAY:
              return{
                ...state,
                TotalDeposit:state.TotalDeposit+parseInt(action.payload.amount) 
              }
                  
       default: return state  
    }
  }
