import request from '../utils/request'



export async function getTodosAll(data){
  return request.post({
    url:'/todos/all',
    data
  })
}

export async function getTodosUnFinished(data){
  return request.post({
    url:'/todos/unFinished',
    data
  })
}

export async function getTodosFinished(data){
  return request.post({
    url:'/todos/finished',
    data
  })
}

export async function addTodo(data){
  return request.post({
    url:'/todos/add',
    data
  })
}
