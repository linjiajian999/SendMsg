import TestScreen from './test';
import theme from '../../config';
import { StackNavigator } from 'react-navigation';
const testStack = StackNavigator(
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
});
export default testStack;
