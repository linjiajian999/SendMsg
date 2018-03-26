var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { theme } from '../../config';
// compoents
import HomeItem from './home-item';
// tool
import SendMsgTool from '../../send-msg-tool';
// api
import api from '../../api';
export var SendState;
(function (SendState) {
    SendState["waitting"] = "\u7B49\u5F85\u53D1\u9001";
    SendState["sending"] = "\u53D1\u9001\u4E2D";
    SendState["success"] = "\u53D1\u9001\u6210\u529F";
    SendState["error"] = "\u53D1\u9001\u9519\u8BEF";
})(SendState || (SendState = {}));
/**
 * implement
 */
class Home extends Component {
    constructor(props) {
        super(props);
        this.LINSTENER_KEY = 'Home_LINSTENER_KEY';
        this.MAX_LIST_COUNT = 100;
        this.timer = -1;
        this.timerInterval = 2000;
        this.lastSendMsgIndex = -1;
        /**
         * render function
         */
        this.keyExtractor = (item, index) => {
            return `${item.phone}${index}`;
        };
        // item
        this.renderItem = ({ item }) => {
            return (React.createElement(HomeItem, { phone: item.phone, state: item.state }));
        };
        // item separator
        this.itemSeparator = () => {
            return (React.createElement(View, { style: itemSeparatorStyle.main }));
        };
        this.switchOnPress = () => {
            console.log('change');
            this.setState((prevState, props) => {
                if (!prevState.isStart) {
                    this.toFetchDataCirculating();
                }
                else {
                    this.stopFetchData();
                }
                return {
                    isStart: !prevState.isStart
                };
            });
        };
        const data = [];
        this.state = {
            data,
            isStart: false
        };
    }
    render() {
        return (React.createElement(View, { style: style.container },
            React.createElement(FlatList, { style: style.flat, data: this.state.data, keyExtractor: this.keyExtractor, renderItem: this.renderItem, ItemSeparatorComponent: this.itemSeparator }),
            React.createElement(Button, { title: this.state.isStart ? '暂停' : '开始', color: this.state.isStart
                    ? theme.falseColor
                    : theme.trueColor, onPress: this.switchOnPress })));
    }
    /**
     * methods
     */
    componentWillMount() {
        SendMsgTool.addListener(this.LINSTENER_KEY, (info) => {
            console.log(info);
        });
    }
    fetchData(startId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(api.testApi);
                const e = yield res.json();
                console.log(e);
                // deal data
                // this.list += e.data.list
                // check shounld start to send msg circulating
                const lastId = 0;
                if (e.state === 'ok') {
                    return Promise.resolve(lastId);
                }
                else {
                    return Promise.reject('fail');
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    stopFetchData() {
        if (this.timer === -1)
            return;
        clearInterval(this.timer);
        this.timer = -1;
    }
    toFectchDataRecursive(startId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theLastId = yield this.fetchData(startId);
                this.toFectchDataRecursive(theLastId);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    toFetchDataCirculating() {
        this.stopFetchData();
        this.timer = setInterval(() => {
            // this.fetchData()
        }, this.timerInterval);
    }
    sendMsgRecursive() {
        if (!this.state.isStart)
            return;
        // this.lastSendMsgIndex
    }
    toSendMsg(id, phone, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SendMsgTool.sendMsg(id, phone, msg);
        });
    }
}
Home.navigationOptions = {
    title: '首页'
};
export default Home;
// STYLE
const style = StyleSheet.create({
    container: {
        flex: 1
    },
    flat: {}
});
const itemSeparatorStyle = StyleSheet.create({
    main: {
        height: 1,
        width: '100%',
        backgroundColor: 'red'
    }
});
