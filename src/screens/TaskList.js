//imports components react
import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList
} from 'react-native'

//imports third components
import momemt from 'moment'
import 'moment/locale/pt-br'

//imports components
import Task from '../components/Task'

//imports styles and images and fonts
import commonStyles from '../styles/commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

export default class TaskList extends Component {

    state = {
        tasks: [{
            id: Math.random(),
            desc: 'Comprar Livro de JavaScript',
            estimateAt: new Date(),
            doneAt: new Date()
        }, {
            id: Math.random(),
            desc: 'Ler Livro de JavaScript',
            estimateAt: new Date(),
            doneAt: null
        }]
    }

    //funcao marcar como concluida ou deixar em aberto
    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({
            tasks
        })
    }

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
                    <FlatList
                        data={this.state.tasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/>}
                    />
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