import React, { Component } from 'react';
import { View, Text } from 'react-native';
class Setting extends Component {
    render() {
        return (React.createElement(View, null,
            React.createElement(Text, null, "\u8BBE\u7F6E")));
    }
}
Setting.navigationOptions = {
    title: '设置'
};
export default Setting;
