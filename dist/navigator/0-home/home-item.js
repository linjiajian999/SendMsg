import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
class HomeItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { style: style.container },
            React.createElement(View, { style: style.left },
                React.createElement(Text, { style: style.mainText }, this.props.phone),
                React.createElement(Text, { style: style.mainText }, '2018-03-26 18:88:88')),
            React.createElement(View, { style: style.right },
                React.createElement(Text, { style: style.subText }, this.props.state)),
            React.createElement(View, { style: style.loading },
                React.createElement(ActivityIndicator, { animating: true, size: "small" }))));
    }
}
export default HomeItem;
const height = 56;
const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        height,
        paddingLeft: 16,
        paddingRight: 16
    },
    left: {
        // justifyContent: 'space-between',
        // alignItems:'center',
        height,
        flex: 1,
        justifyContent: 'center',
    },
    right: {
        // justifyContent: 'space-between',
        // alignItems:'center',
        height,
        width: 120,
        justifyContent: 'center',
    },
    loading: {
        height,
        justifyContent: 'center',
    },
    mainText: {},
    subText: {}
});
