import React from 'react'
import { Text } from 'react-native'
import {
    StackNavigator,
} from 'react-navigation'
import Home from '../views/home'
import History from '../views/history'

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
            title: 'history',
            headerTitle: 'af',
            headerLeft: <Text onPress={() => console.log(navigation)}>fasfas</Text>,
            headerRight: <Text>fasfas</Text>,
            headerTitleStyle: {
                color: 'red'
            }
        })
    }
})

export default App