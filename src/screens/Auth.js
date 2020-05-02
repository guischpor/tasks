//imports components react
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableHighlight,
    Alert
} from 'react-native'
import axios from 'axios'

//imports components
import AuthInput from '../components/AuthInput'
import {
    server,
    showError,
    showSuccess
} from '../common'

//imports images, styles and icons
import commonStyles from '../styles/commonStyles'
import { relativeTimeThreshold } from 'moment'
const backgroundImg = require('../../assets/imgs/login.jpg')

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    //metodo de login e cadastro
    signinOrSignup = () => {
        if (this.state.stageNew) {
            //Alert.alert('Sucesso', 'Criar conta!')
            this.signup()
        } else {
            //Alert.alert('Sucesso', 'Logar!')
            this.signin()
        }
    }

    //metodo de signup cadastro
    signup = async() => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário Cadastrado!')
            this.setState({
                ...initialState
            })
        } catch(e) {
            showError(e)
        }
    }

    //metodo de login
    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorizations'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch(e) {
            showError(e)
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        //se estiver na tela de cadastro
        if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
        }

        const validForm = validations.reduce((t, a) => t && a)

        return(
            <ImageBackground
                source={backgroundImg}
                style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>

                    <Text style={styles.subTitle}>
                        {this.state.stageNew ? 'Crie a sua conta!' : 'Informe os seus dados!'}
                    </Text>

                    {this.state.stageNew &&
                        <AuthInput
                            icon='user'
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                            style={styles.input}
                        />
                    }

                    <AuthInput
                        icon='at'
                        placeholder='E-mail'
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        style={styles.input}
                    />

                    <AuthInput
                        icon='lock'
                        placeholder='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        style={styles.input}
                        secureTextEntry={true}
                    />

                    {this.state.stageNew &&
                        <AuthInput
                            icon='asterisk'
                            placeholder='Confirmação de Senha'
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    }

                    <TouchableHighlight onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : {backgroundColor: '#aaa'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight
                    style={{ padding: 10 }}
                    onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                    <Text style={styles.buttonText}>
                        {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                    </Text>
                </TouchableHighlight>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF'
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 7
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }
})