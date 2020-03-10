import request from '../utils/request'



export async function getMyInfo(data){
  return request.post({
    url:'/my/info',
    data
  })
}
