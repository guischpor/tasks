//import components react
import React, { Component } from 'react'
import {
    Text,
    View
} from 'react-native'
import {
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation'

//import components
import Auth from './screens/Auth'
import TaskList from './screens/TaskList'

//imports styles, images and icons

const mainRoutes = {
    Auth: {
        name: 'Auth',
        screen: Auth
    },
    Home: {
        name: 'Home',
        screen: TaskList
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Auth'
})

export default createAppContainer(mainNavigator)
