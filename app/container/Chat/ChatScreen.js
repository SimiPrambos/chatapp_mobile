import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Container, Header, Body, Left, Right, Icon, Title, Text, View, Button } from 'native-base'
import { GiftedChat } from 'react-native-gifted-chat'
import ChatService from '../../services/ChatService'
import Modal from "react-native-modal"
import AuthService from '../../services/AuthService';

const { height, width } = Dimensions.get('screen')

export default class ChatScreen extends Component {
    state = {
        id: null,
        messages: [],
        optionVisible: false,
        selectedMessage: {}
    }

    async componentWillMount() {
        this.handleFetchChats()
    }


    handleFetchChats() {
        this.autofetch = setInterval(async () => {
            await ChatService.fetchChats().then(chats => {
                this.setState({ messages: this.serializer(chats) })
            })
        }, 1000)
    }

    serializer(data) {
        let serializer = []
        data.map(item => {
            serializer.push({
                _id: item.id,
                text: item.text,
                createdAt: item.createdAt,
                user: {
                    _id: item.user.id,
                    name: item.user.username,
                    avatar: 'https://placeimg.com/140/140/any'
                }
            })
        })
        return serializer
    }

    onLogout() {
        clearInterval(this.autofetch)
        AuthService.logout().then(() => {
            this.props.navigation.navigate('Unauth')
        })
    }

    onSend(messages) {
        messages.map(async (message) => {
            let sendMessage = await ChatService.sendMessage(message.text)
            if (!sendMessage.created) {
                alert(`Ups can't send your message, please try again!`)
            }
        })
    }

    async onDelete() {
        let chat_id = this.state.selectedMessage._id
        let deleted = await ChatService.deleteMessage(chat_id)
        if (!deleted) {
            alert('cannot delete')
        }
        this.toggleModal()
    }

    onLongPress(message) {
        if (message.user._id !== this.props.navigation.getParam('_id', null)) {
            return
        }

        this.setState({ selectedMessage: message }, () => {
            this.setState({ optionVisible: true })
        })
    }

    toggleModal = () => {
        this.setState({ optionVisible: !this.state.optionVisible });
    }

    render() {
        const _id = this.props.navigation.getParam('_id', null)

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.onLogout()}>
                            <Icon type='Entypo' name='chevron-left' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Group Chat</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon type='Entypo' name='dots-three-vertical' />
                        </Button>
                    </Right>
                </Header>
                <Modal
                    isVisible={this.state.optionVisible}
                    onBackdropPress={this.toggleModal}
                    onBackButtonPress={this.toggleModal}
                    deviceHeight={height}
                    deviceWidth={width}
                >
                    <View style={styles.modalOption}>
                        {/* <Button transparent full onPress={() => alert('update')}>
                            <Text>Update</Text>
                        </Button> */}
                        <Button transparent full onPress={() => this.onDelete()}>
                            <Text style={styles.option}>Delete</Text>
                        </Button>
                    </View>
                </Modal>

                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{ _id }}
                    renderUsernameOnMessage
                    scrollToBottom
                    placeholder='Tulis pesan'
                    onLongPress={(context, message) => this.onLongPress(message)}
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    modalOption: {
        flex: 1,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        margin: 20,
        maxHeight: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    option: { color: '#ff0000', fontWeight: 'bold' }
})