import {
    createAppContainer,
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'
import LoginScreen from '../container/Login/LoginScreen'
import ChatScreen from '../container/Chat/ChatScreen'


const AppNavigator = createSwitchNavigator({
    Unauth: createStackNavigator({
        Login: LoginScreen
    }, {
            headerMode: 'none'
        }),
    Auth: createStackNavigator({
        Chat: ChatScreen
    }, {
            headerMode: 'none',
            initialRouteName: 'Chat',
            initialRouteKey: 'Chat'
        })
}, {
        initialRouteName: 'Unauth'
    })

export default createAppContainer(AppNavigator)