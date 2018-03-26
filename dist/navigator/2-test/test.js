import React, { Component } from 'react';
import { View, Text, TextInput, Button, Modal } from 'react-native';
import SendMsgTool, { SEND_STATE } from '../../send-msg-tool';
class Test extends Component {
    constructor(props) {
        super(props);
        this.LINSTENER_KEY = 'Test_LINSTENER_KEY';
        this._onPhoneChange = (phone) => {
            this.setState({
                phone
            });
        };
        this._onContentChange = (content) => {
            this.setState({
                content
            });
        };
        this._press = () => {
            if (this.state.isSending) {
                return;
            }
            if (!this.state.phone) {
                return;
            }
            this.setState((preState) => {
                return {
                    isSending: true,
                    msgId: ++preState.msgId
                };
            });
            SendMsgTool.sendMsg(this.state.msgId, this.state.phone, this.state.content)
                .then(info => {
                console.log(info);
                this.setState({
                    isSending: false,
                    sendState: '发送中...'
                });
            }).catch(e => {
                this.setState({
                    isSending: false,
                    sendState: '发送失败'
                });
                console.log(e);
            });
        };
        this._modalOnClose = () => {
            this.setState({
                modalVisible: false
            });
        };
        this.state = {
            phone: '10010',
            content: 'hello native',
            msgId: 0,
            isSending: false,
            modalVisible: false,
            sendState: ''
        };
    }
    componentWillMount() {
        SendMsgTool.addListener(this.LINSTENER_KEY, (info) => {
            console.log(`test can listen the send msg callback : ${info.msgId}`);
            if (info.info === SEND_STATE.SEND_STATE_SUCC) {
                this.setState({
                    sendState: info.info,
                    modalVisible: true,
                    isSending: false
                });
            }
            else {
                this.setState({
                    sendState: info.info,
                    isSending: false
                });
            }
        });
    }
    render() {
        return (React.createElement(View, null,
            React.createElement(View, null,
                React.createElement(Text, null, "\u624B\u673A\u53F7\u7801"),
                React.createElement(TextInput, { onChangeText: phone => this._onPhoneChange(phone), value: this.state.phone }),
                React.createElement(Text, null, "\u53D1\u9001\u5185\u5BB9"),
                React.createElement(TextInput, { onChangeText: content => this._onContentChange(content), value: this.state.content })),
            React.createElement(Text, null, this.state.sendState),
            React.createElement(Button, { title: this.state.isSending
                    ? '正在通知手机发送短信'
                    : '点击发送', onPress: this._press }),
            React.createElement(Modal, { animationType: "slide", transparent: false, visible: this.state.modalVisible, onRequestClose: this._modalOnClose },
                React.createElement(View, null,
                    React.createElement(Text, null, this.state.sendState)))));
    }
}
Test.navigationOptions = {
    title: '手动测试'
};
export default Test;
