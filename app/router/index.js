import React from 'react'
import { Text } from 'react-native'
import {
    StackNavigator,
} from 'react-navigation'
import Home from '../views/home'
import History from '../views/history'
import Detail from '../views/detail'
import NavigationHeader from '../components/navigation-header'


const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    History: {
        screen: History,
        navigationOptions: ({ navigation }) => ({
            header: <NavigationHeader
                title="history"
                navigation={navigation}
                rightText='about'
            />
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
            header: <NavigationHeader
                title="详情页"
                navigation={navigation}
            />
        })
    }
}, {
        navigationOptions: {
            gesturesEnabled: true
        }
    })

export default App