import React from 'react'
import { Text } from 'react-native'
import {
    StackNavigator,
} from 'react-navigation'
import Home from '../views/home'
import History from '../views/history'
import NavigationHeader from '../components/navigation-header'

const App = StackNavigator({
    Home: {
        screen: Home,
        mode: null,
        navigationOptions: {
            header: null,
        }
    },
    History: {
        screen: History,
        navigationOptions: ({ navigation }) => ({
            header: <NavigationHeader />
        })
    }
})

export default App