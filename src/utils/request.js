import Taro from '@tarojs/taro'
import auth from './auth'

class Request {
  constructor(){
    const session = Taro.getStorageSync('session');
    this.session = session
  }
  _request(options){
    //全局注入的常量
    // eslint-disable-next-line no-undef
    options.url = REQUEST_BASE_URL + options.url
    options.header = {
      'content-type': 'application/json',
      'Moon-Session': this.session
    }
    return new Promise((resolve,reject)=>{
      Taro.request(options).then(v=>{
          //请求成功
          if(v.statusCode===200){
            if(v.data.code===200){
              resolve(v.data.data)
            } else if(v.data.code===-1){

            }  else if(v.data.code===-2){
              //未登录
              auth.isRegistered()
            }  else if(v.data.code===-3){

            }  else if(v.data.code===-4){

            }  else if(v.data.code===-5){

            }
            //失败
          }else{
            //todo
            reject({
              errorcode:'0001',
            })
          }
          //网络问题
      }).catch(e=>{
        console.log(e)
        reject(e)
      })
    })
  }

  async updateSession(session){
    this.session = session
    return Taro.setStorage({
      key:'session',
      data:session
    })
  }

  get(options){
    options.method = 'GET'
    return this._request(options)
  }

  post(options){
    options.method = 'POST'
    return this._request(options)

  }
}

const request = new Request();
export default request
