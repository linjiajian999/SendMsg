import React, { Component, ReactElement } from 'react'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Modal
} from 'react-native'

import {
  theme
} from '../../config'

import {
  _Props,
  _NavigationOptions
} from '../../types'

import SendMsgTool, {
  SEND_STATE,
  MsgCallbackParams
} from '../../send-msg-tool'

export interface TestState {
  phone: string,
  content: string,
  msgId: number,
  isSending: boolean,
  modalVisible: boolean,
  sendState: string
}

class Test extends Component<any, TestState> {
  public static navigationOptions: _NavigationOptions = {
    title: '手动测试'
  }
  private LINSTENER_KEY = 'Test_LINSTENER_KEY'
  constructor(props: _Props) {
    super(props)
    this.state = {
      phone: '10010',
      content: 'hello native',
      msgId: 0,
      isSending: false,
      modalVisible: false,
      sendState: ''
    }
  }
  _onPhoneChange = (phone: string) => {
    this.setState({
      phone
    })
  }
  _onContentChange = (content: string) => {
    this.setState({
      content
    })
  }
  _press = () => {
    if (this.state.isSending) {
      return
    }
    if (!this.state.phone) {
      return
    }
    this.setState((preState: TestState) => {
      return {
        isSending: true,
        msgId: ++preState.msgId
      }
    })
    SendMsgTool.sendMsg(
      this.state.msgId,
      this.state.phone,
      this.state.content)
    .then(info => {
      console.log(info)
      this.setState({
        isSending: false,
        sendState: '发送中...'
      })
    }).catch(e => {
      this.setState({
        isSending: false,
        sendState: '发送失败'
      })
      console.log(e)
    })
  }
  _modalOnClose = () => {
    this.setState({
      modalVisible: false
    })
  }
  componentWillMount() {
    SendMsgTool.addListener(
      this.LINSTENER_KEY,
      (info: MsgCallbackParams) => {
        console.log(`test can listen the send msg callback : ${info.msgId}`)
        if (info.info === SEND_STATE.SEND_STATE_SUCC) {
          this.setState({
            sendState: info.info,
            modalVisible: true,
            isSending: false
          })
        } else {
          this.setState({
            sendState: info.info,
            isSending: false
          })
        }
      }
    )
  }
  render() {
    return(
      <View>
        <View>
          <Text>手机号码</Text>
          <TextInput
            onChangeText={ phone => this._onPhoneChange(phone) }
            value={ this.state.phone }>
          </TextInput>
          <Text>发送内容</Text>
          <TextInput
            onChangeText={ content => this._onContentChange(content) }
            value={ this.state.content }>
          </TextInput>
        </View>
        <Text>
          { this.state.sendState }
        </Text>
        <Button
          title={
            this.state.isSending
              ? '正在通知手机发送短信'
              : '点击发送'
          }
          onPress={ this._press }
          >
        </Button>
        <Modal
          animationType={ "slide" }
          transparent={ false }
          visible={this.state.modalVisible}
          onRequestClose={ this._modalOnClose }>
          <View>
            <Text>
              { this.state.sendState }
            </Text>
          </View>
        </Modal>
      </View>
    )
  }
}

export default Test