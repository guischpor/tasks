//imports components react
import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableHighlight,
    Platform,
    Alert
} from 'react-native'

//imports components

//imports images, styles and icons
import commonStyles from '../styles/commonStyles'
const backgroundImg = require('../../assets/imgs/login.jpg')

export default class Auth extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    //metodo de login e cadastro
    signinOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert('Sucesso', 'Criar conta!')
        } else {
            Alert.alert('Sucesso', 'Logar!')
        }
    }

    render() {
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
                        <TextInput
                            placeholder='Nome'
                            value={this.state.name}
                            onChangeText={name => this.setState({name})}
                            style={styles.input}
                        />
                    }

                    <TextInput
                        placeholder='E-mail'
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder='Senha'
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        style={styles.input}
                        secureTextEntry={true}
                    />

                    {this.state.stageNew &&
                        <TextInput
                            placeholder='Confirmação de Senha'
                            value={this.state.confirmPassword}
                            onChangeText={confirmPassword => this.setState({confirmPassword})}
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    }

                    <TouchableHighlight onPress={this.signinOrSignup}>
                        <View style={styles.button}>
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
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer:{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
        width: '90%'
    },
    input: {
        margin: 10,
        backgroundColor: '#fff',
        padding: Platform.OS == 'ios' ? 15 : 10,
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        fontSize: 20
    }
})