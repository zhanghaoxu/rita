import {
  IS_LOGIN,
  IS_REGISTER
} from '../constants/auth.js'

const INITIAL_STATE = {
  isLogin:false,
  isRegister:false
}

export default function auth (state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin:action.isLogin
      }
    case IS_REGISTER:
      return {
        ...state,
        isRegister:action.isRegister
      }
    default:
      return state
  }
}
