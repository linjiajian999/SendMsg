import HomeScreen from './home';
import theme from '../../config';
import { StackNavigator } from 'react-navigation';
const homeStack = StackNavigator(
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
});
export default homeStack;
