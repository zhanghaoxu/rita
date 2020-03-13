import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {getMyInfo} from '../../apis/user'
import {addTodo,getTodosAll,getTodosUnFinished,getTodosFinished} from '../../apis/todos'
import { add, minus, asyncAdd } from '../../store/actions/counter'
import auth from '../../utils/auth'
import './index.less'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {

    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {
    console.log(333)
    this.initData()
  }

  componentDidHide () { }

  async getUserInfoHandler(v){
    await auth.register(v)

  }
  initData(){
    getTodosFinished().then(v=>{
      console.log(444)
    })
    getTodosAll().then(v=>{
      console.log(111)
    })

    getTodosUnFinished().then(v=>{
      console.log(333)
    })
    getMyInfo().then(v=>{
      console.log(222)
    })




  }

  async addTodo(){
    await addTodo({name:this.state.value})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>

        <Input type='text' placeholder='将会获取焦点' value={this.state.value} onChange={this.handleChange.bind(this)} focus />
        <Button  onClick={this.addTodo.bind(this)}>添加</Button>
        <Text>Hello world!</Text>
        <Button openType='getUserInfo' onGetUserInfo={this.getUserInfoHandler.bind(this)}>用户信息</Button>
      </View>
    )
  }
}

export default Index
