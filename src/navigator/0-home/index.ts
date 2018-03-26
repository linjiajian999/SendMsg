import HomeScreen from './home'

import theme from '../../config'

import {
  StackNavigator,
  NavigationContainer
} from 'react-navigation'

const homeStack : NavigationContainer =  StackNavigator(
  // RouteConfigs
  {
    Home: {
      getScreen: () => HomeScreen,
      path: 'home'
    }
  },
  // StackNavigatorConfig
  {
    navigationOptions: {
      headerTintColor: theme.headerTintColor
    }
  }
)
export default homeStack
