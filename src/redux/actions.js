

export const EXAMPLE = 'EXAMPLE'
export const USER = "USER"
export const USER_ROLE = "USER_ROLE"
export const USER_NAME = "USER_NAME"
export const USER_ID = "USER_ID"
export const LOGOUT = "LOGOUT"
export const ADD_PAY = "ADD_PAY"
export const ADD_LOCATION = "ADD_LOCATION"


export function example(){ 
  return{
    type: EXAMPLE,
  } 
}
export function logout(){ 
  return{
    type: LOGOUT,
    
  } 
}
export function user(user){ 
  return{
    type: USER,
    payload:user
  } 
}

export function userRole(UserRole){ 
  return{
    type: USER_ROLE,
    payload:UserRole
  } 
}
export function userName(UserName){ 
  return{
    type: USER_NAME,
    payload:UserName
  } 
}
  
  export function userId(UserId){
    return{
    type: USER_ID,
    payload: UserId
    }
  }
  export function addPay(payment){
    return{
    type: ADD_PAY,
    payload: payment
    }
  }
  export function addLocation(LocationId){
    return{
    type: ADD_LOCATION,
    payload: LocationId
    }
  }





