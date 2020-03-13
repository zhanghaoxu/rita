'use strict'
import {IS_LOGIN,IS_REGISTER} from '../constants/auth'
import {isLogin as isLoginApi,isRegister as isRegisterApi} from '../../apis/auth'

export function setIsLogin(isLogin){
  return {
    type:IS_LOGIN,
    isLogin
  }
}

export function setIsRegister(isRegister){
  return {
    type:IS_REGISTER,
    isRegister
  }
}

// 异步的 action
export function asyncGetIsLogin () {
  return dispatch => {
    isLoginApi().then(v=>{
      dispatch(setIsLogin(v.isLogin))
    }).catch(e=>{
      //todo log error
    })
  }
}

// 异步的 action
export function asyncGetIsRegister () {
  return dispatch => {
    isRegisterApi().then(v=>{
      dispatch(setIsRegister(v.isRegister))
    }).catch(e=>{
      //todo log error
    })
  }
}
