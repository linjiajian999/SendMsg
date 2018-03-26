import SettingScreen from './setting';
import theme from '../../config';
import { StackNavigator } from 'react-navigation';
const settingStack = StackNavigator(
// RouteConfigs
{
    Setting: {
        getScreen: () => SettingScreen,
        path: 'setting'
    }
}, {
    navigationOptions: {
        headerTintColor: theme.headerTintColor
    }
});
export default settingStack;
