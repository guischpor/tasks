//imports components react
import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet
} from 'react-native'
import momemt from 'moment'
import 'moment/locale/pt-br'

//imports components

//imports styles and images and fonts
import commonStyles from '../styles/commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

export default class TaskList extends Component {
    render() {
        const today = momemt().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <ImageBackground
                    source={todayImage}
                    style={styles.background}
                >
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Text>Tarafa #01</Text>
                    <Text>Tarafa #02</Text>
                    <Text>Tarafa #03</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    },
})