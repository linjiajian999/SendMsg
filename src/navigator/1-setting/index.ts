import SettingScreen from './setting'

import theme from '../../config'

import {
  StackNavigator,
  NavigationContainer
} from 'react-navigation'

const settingStack : NavigationContainer = StackNavigator(
   // RouteConfigs
  {
    Setting: {
      getScreen: () => SettingScreen,
      path: 'setting'
    }
  },
  {
    navigationOptions: {
      headerTintColor: theme.headerTintColor
    }
  }
)
export default settingStack
