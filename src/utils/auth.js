import Taro from '@tarojs/taro'
import {isRegister as isRegisterRequest, register} from '../apis/auth'
import request from './request'
import store from '../store'
import {setIsLogin} from '../store/actions/auth'


class Auth {
  async isRegistered(){
    if(this.isRegisteredRequesting) return

    try{
      this.isRegisteredRequesting = true
      const code = await this.wxLoginRequest();

      const result = await isRegisterRequest({
        code
      })
      this.isRegisteredRequesting = false
      const {isRegister,session} = result
      if(isRegister){

        this.registeredToAutoLogin(session)
      }else{
        this.unRegisterWaitUserAuth()
      }
    }catch(e){
      // todo log error
      console.log(e)
    }
  }

  async register(){
    if(this.isRegisterRequesting) return

    try{
      this.isRegisterRequesting = true
      const code = await this.wxLoginRequest();

      const userInfo = await Taro.getUserInfo({
        withCredentials:true,
        lang:'zh_CN'
      });
      console.log(userInfo)
      const query = {
        ...userInfo,
        code
      }

      const {user,session} = await register(query);
      this.isRegisterRequesting = false
      request.updateSession(session)

    }catch(e){
      //todo
      console.log(e)
    }
  }


  unRegisterWaitUserAuth(){
    Taro.setStorage({
      key:'isAuth',
      data: 0
    })
    store.dispatch(setIsLogin(0))
  }

  async wxLoginRequest() {
    // 简单封装wx.login 调用加锁 避免重复调用 支持promise化

    return new Promise((resolve, reject) => {
      Taro.login().then(v=>{
        resolve(v.code);

      }).catch(e=>{
        reject(e);

      })
    })
  }

  registeredToAutoLogin(session){
    Promise.all([
      Taro.setStorage({
        key:'isAuth',
        data: 1
      }),
      request.updateSession(session),
      store.dispatch(setIsLogin(1))
    ]).then(v=>{
      console.log(v)

    }).catch(e=>{
      console.log(e)
    })

  }

  wxCheckSession() {
    Taro.checkSession({
      success: () => {
        // 成功 sessionKey在本访问周期一直有效
        console.log('sessionKey未过期')
        console.log('user sessionKey未过期')
        // 检查后端登陆态 （卸载小程序会导致登陆态丢失）
        if (!Taro.getStorageSync('isAuth')) {
          console.log('user sessionKey 未过期 && user 登录态丢失 查询用户登陆态。。。')
          this.isRegistered()
        }
      },
      fail: () => {
        // sessionKey失效
        // 查询注册状态 刷新sessionKey 和 登陆态
        console.log('user sessionKey 过期 查询用户登录状态')
        this.isRegistered()
      }
    })
  }
}

export default new Auth()
