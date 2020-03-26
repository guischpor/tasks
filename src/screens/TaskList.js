//imports components react
import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native'

//imports third components
import momemt from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'

//imports components
import Task from '../components/Task'
import AddTask from './AddTask'

//imports styles and images and fonts
import commonStyles from '../styles/commonStyles'
import todayImage from '../../assets/imgs/today.jpg'

export default class TaskList extends Component {

    state = {
        showDoneTasks: true,
        showAddTask: true,
        visibleTasks: [],
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

    componentDidMount = () => {
        this.filterTasks()
    }

    //funcao que filtra as atividades concluidas ou não
    toggleFilter = () => {
        this.setState({
            showDoneTasks: !this.state.showDoneTasks
        }, this.filterTasks)
    }

    //funcao filtrar
    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({
            visibleTasks
        })
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
        }, this.filterTasks)
    }

    render() {
        const today = momemt().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                />
                <ImageBackground
                    source={todayImage}
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toggleFilter}>
                        <Icon
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20}
                                color={commonStyles.colors.secondary}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList
                        data={this.state.visibleTasks}
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
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS === 'ios' ? 40 : 10
    },
})