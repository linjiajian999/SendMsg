import React, { Component, ReactElement } from 'react'

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  Button
} from 'react-native'

import {
  theme
} from '../../config'

import {
  _Props,
  _NavigationOptions
} from '../../types'

// compoents
import HomeItem from './home-item'

// tool
import SendMsgTool, {
  SendMsgToolListener,
  SEND_STATE,
  MsgCallbackParams
} from '../../send-msg-tool'

// api
import api from '../../api'

export interface HomeDataListItem {
  phone: string | number,
  state: SendState
}
export enum SendState {
  waitting = '等待发送',
  sending = '发送中',
  success = '发送成功',
  error = '发送错误'
}

export interface HomeState {
  data: Array<HomeDataListItem>
  isStart: boolean
}

/**
 * implement
 */
class Home extends Component<any, HomeState> {
  static navigationOptions: _NavigationOptions = {
    title: '首页'
  }
  private LINSTENER_KEY = 'Home_LINSTENER_KEY'
  private MAX_LIST_COUNT = 100
  private timer = -1
  private timerInterval = 2000
  private lastSendMsgIndex = -1

  constructor(props: _Props) {
    super(props)
    const data: Array<HomeDataListItem> = []
    this.state = {
      data,
      isStart: false
    }
  }
  /**
   * render function
   */
  keyExtractor = (item: HomeDataListItem, index: number) => {
    return `${item.phone}${index}`
  }
  // item
  renderItem = ({ item }: ListRenderItemInfo<HomeDataListItem> ) => {
    return (
      <HomeItem
        phone={ item.phone }
        state={ item.state }>
      </HomeItem>
    )
  }
  // item separator
  itemSeparator: () => ReactElement<any> = () => {
    return (
      <View style={ itemSeparatorStyle.main }></View>
    )
  }
  switchOnPress = () => {
    console.log('change')
    this.setState((prevState: Readonly<HomeState>, props: _Props) => {
      if (!prevState.isStart) {
        this.toFetchDataCirculating()
      } else {
        this.stopFetchData()
      }
      return {
        isStart: !prevState.isStart
      }
    })
  }
  render() {
    return (
      <View style={ style.container }>
        <FlatList
          style={ style.flat }
          data={ this.state.data }
          keyExtractor={ this.keyExtractor }
          renderItem={ this.renderItem }
          ItemSeparatorComponent={ this.itemSeparator }>
        </FlatList>
        <Button
          title={ this.state.isStart ? '暂停' : '开始' }
          color={
            this.state.isStart
              ? theme.falseColor
              : theme.trueColor
            }
          onPress={ this.switchOnPress }>
        </Button>
      </View>
    )
  }
  /**
   * methods
   */
  componentWillMount() {
    SendMsgTool.addListener(
      this.LINSTENER_KEY,
      (info: MsgCallbackParams) => {
        console.log(info)
      }
    )
  }
  async fetchData(startId: number) {
    try {
      const res = await fetch(api.testApi)
      const e = await res.json()
      console.log(e)
      // deal data
      // this.list += e.data.list
      // check shounld start to send msg circulating
      const lastId = 0
      if (e.state === 'ok') {
        return Promise.resolve(lastId)
      } else {
        return Promise.reject('fail')
      }
    } catch (err) {
      console.log(err)
      return Promise.reject(err)
    }
  }
  stopFetchData() {
    if (this.timer === -1) return
    clearInterval(this.timer)
    this.timer = -1
  }
  async toFectchDataRecursive(startId: number): Promise<any> {
    try {
      const theLastId = await this.fetchData(startId)
      this.toFectchDataRecursive(theLastId)
    } catch (err) {
      console.log(err)
    }
  }
  toFetchDataCirculating() {
    this.stopFetchData()
    this.timer = setInterval(() => {
      // this.fetchData()
    }, this.timerInterval)
  }
  sendMsgRecursive() {
    if (!this.state.isStart) return
    // this.lastSendMsgIndex
  }
  async toSendMsg(id: number, phone: string, msg: string) {
    return await SendMsgTool.sendMsg(id, phone, msg)
  }
}
export default Home

// STYLE
const style = StyleSheet.create({
  container: {
    flex: 1
  },
  flat: {
  }
})
const itemSeparatorStyle = StyleSheet.create({
  main: {
    height: 1,
    width: '100%',
    backgroundColor: 'red'
  }
})