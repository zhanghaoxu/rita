import request from '../utils/request'

export function isRegister(data){
  return request.post({
    url:'/auth/isRegister',
    data
  })
}

export function register(data){
  return request.post({
    url:'/auth/register',
    data
  })
}

export function isLogin(data){
  return request.post({
    url:'/auth/isLogin',
    data
  })
}

export function login(data){
  return request.post({
    url:'/auth/login',
    data
  })
}
