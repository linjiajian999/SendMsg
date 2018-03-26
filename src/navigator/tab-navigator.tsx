import React, { Component } from 'react'

import {
  Image,
  StyleSheet
} from 'react-native'

import {
  TabNavigator,
  NavigationContainer
} from 'react-navigation'

import HomeStack from './0-home'
import SettingStack from './1-setting'
import TestStack from './2-test'

const tabNavigator : NavigationContainer = TabNavigator(
  // RouteConfigs https://reactnavigation.org/docs/tab-navigator.html
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        title: '首页'
      }
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: {
        title: '设置'
      }
    },
    TestStack: {
      screen: TestStack,
      navigationOptions: {
        title: '测试'
      }
    }
  },
  // TabNavigatorConfig https://reactnavigation.org/docs/tab-navigator.html
  {
    tabBarOptions: {
      activeTintColor: '#ffc936',
    }
  }
)
export default  tabNavigator