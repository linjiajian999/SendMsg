import TestScreen from './test'

import theme from '../../config'

import {
  StackNavigator,
  NavigationContainer
} from 'react-navigation'

const testStack : NavigationContainer =  StackNavigator(
  // RouteConfigs
  {
    Test: {
      getScreen: () => TestScreen,
      path: 'test'
    }
  },
  // StackNavigatorConfig
  {
    navigationOptions: {
      headerTintColor: theme.headerTintColor
    }
  }
)
export default testStack
