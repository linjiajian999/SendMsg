import React, { Component, ReactElement } from 'react'

import {
  View,
  Text
} from 'react-native'

import {
  _Props,
  _NavigationOptions
} from '../../types'

class Setting extends Component {
  static navigationOptions: _NavigationOptions = {
    title: '设置'
  }
  render() {
    return (
      <View>
        <Text>设置</Text>
      </View>
    )
  }
}
export default Setting
