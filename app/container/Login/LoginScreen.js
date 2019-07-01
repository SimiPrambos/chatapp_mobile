import React, { Component } from 'react'
import { Alert, TextInput, View, StyleSheet } from 'react-native'
import { Container, Text, Button, Header, Footer, Form, Item, Input } from 'native-base'
import AuthService from '../../services/AuthService'
import styles from './LoginStayles'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        };
    }

    async componentWillMount() {
        const userLoggedIn = await AuthService.isLoggedIn()
        if (userLoggedIn) {
            this.handleLoginSuccess(userLoggedIn.id)
        }
    }

    handleLoginSuccess(_id) {
        this.props.navigation.navigate({ routeName: 'Chat', routeKey: 'Chat', params: { _id } })
    }

    async onLogin() {
        const { username, password } = this.state

        const response = await AuthService.login(username, password)
        if (response.isLoggedIn) {
            this.handleLoginSuccess(response.message)
        } else {
            this.setState({
                username: '',
                password: '',
            })
            Alert.alert(response.message)
        }
    }

    _handleForgotAccount() {
        alert('forgot account!')
    }

    _handleCreateAccount() {
        alert('create account!')
    }

    render() {
        return (
            <Container>
                <View style={styles.body}>
                    <View style={styles.container}>
                        <Text style={styles.brand}> GroupChat </Text>
                        <Form>
                            <Item regular style={styles.field}>
                                <Input
                                    placeholder={lang.username_or_email}
                                    placeholderTextColor="grey"
                                    style={styles.label}
                                    onChangeText={(username) => this.setState({ username })}
                                />
                            </Item>
                            <Item regular style={styles.field}>
                                <Input
                                    secureTextEntry={true}
                                    placeholder={lang.password}
                                    placeholderTextColor="grey"
                                    style={styles.label}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                            <Button block style={styles.button} onPress={() => this.onLogin()}>
                                <Text>{lang.login}</Text>
                            </Button>
                        </Form>
                        <View style={styles.spanText}>
                            <Text>
                                <Text style={[styles.smallText, styles.greyText]}>{lang.forgot_password}</Text>
                                <Text
                                    style={[styles.smallText, styles.bold]}
                                    onPress={() => this._handleForgotAccount()}
                                >
                                    {lang.get_help}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <Footer style={[styles.center, styles.white]}>
                    <View style={styles.spanText}>
                        <Text>
                            <Text style={styles.smallText}>{lang.no_account} </Text>
                            <Text
                                style={[styles.smallText, styles.bold]}
                                onPress={() => this._handleCreateAccount()}
                            >
                                {lang.create_account}
                            </Text>
                        </Text>
                    </View>
                </Footer>
            </Container>
        )
    }
}

const lang = {
    username_or_email: 'Nomor telepon, email atau nama pengguna',
    password: 'Kata Sandi',
    login: 'Masuk',
    forgot_password: 'Lupa detail informasi masuk anda?',
    get_help: 'Dapatkan bantuan untuk masuk',
    no_account: 'Tidak punya akun?',
    create_account: 'Buat akun',
}