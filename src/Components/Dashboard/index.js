import React, { Component } from 'react';
import {
    Text, View, ImageBackground, Dimensions, TouchableOpacity, BackHandler, Alert, Platform, StyleSheet
} from 'react-native';
import BG from "../../assets/bgapp2.jpg"
import Icon from "react-native-vector-icons/Feather"
import UserList from "./UserList/index"
import ChatList from "./ChatsList"
import AsyncStorage from '@react-native-community/async-storage';

const { height, width } = Dimensions.get("window")
export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            currentUser: {},
            userTapStyle: 0,
            chatTapStyle: 0.5,
            prifileTapStyle: 0,
            phoneTapStyle: 0,
        }
    }


    componentDidMount() {
        if (Platform.OS == "android") {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        }

        AsyncStorage.getItem("currentUser")
            .then((snap) => {
                this.setState({
                    currentUser: JSON.parse(snap)
                })
            })
    }

    handleBackButton = () => {
        Alert.alert(
            'Exit App',
            'Exiting the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


    tabHeandler(type) {
        switch (type) {
            case "users":
                this.setState({
                    userTapStyle: 0.5,
                    chatTapStyle: 0,
                    prifileTapStyle: 0,
                    phoneTapStyle: 0,
                })
                break;
            case "chat":
                this.setState({
                    userTapStyle: 0,
                    chatTapStyle: 0.5,
                    prifileTapStyle: 0,
                    phoneTapStyle: 0,
                })
                break;
            case "profile":
                this.setState({
                    userTapStyle: 0,
                    chatTapStyle: 0,
                    prifileTapStyle: 0.5,
                    phoneTapStyle: 0,
                })
                break;
            case "phone":
                this.setState({
                    userTapStyle: 0,
                    chatTapStyle: 0,
                    prifileTapStyle: 0,
                    phoneTapStyle: 0.5,
                })
                break;
        }
    }

    render() {
        const {
            userTapStyle,
            chatTapStyle,
            prifileTapStyle,
            phoneTapStyle,
            currentUser
        } = this.state;
        const navigation = this.props.navigation
        return (
            <ImageBackground
                blurRadius={3}
                source={BG}
                resizeMode="stretch" style={{ flex: 1 }} >
                <View style={styles.container}>
                    <View style={styles.header} >
                        <View style={styles.headerHeadingView} >
                            <Text style={styles.headingText}>{"Username"}</Text>
                        </View>
                        <View style={styles.headerButtonContainer} >
                            <TouchableOpacity activeOpacity={0.6}
                                style={styles.headerButton}>
                                <Icon style={styles.headerButton}
                                    name="search" color="#fff" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1 }} >
                        {(userTapStyle === 0.5) ?
                            <UserList navigation={navigation} currentUser={currentUser} />
                            :
                            (chatTapStyle === 0.5) ?
                                <ChatList currentUser={currentUser} navigation={navigation} />
                                : null}
                    </View>

                    <View style={styles.tapContainer} >
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.tabHeandler.bind(this, "chat")}
                            style={[styles.tabButton, { borderWidth: chatTapStyle }]} >
                            <Icon style={styles.Icon}
                                name="message-square"
                                color="#fff" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.tabHeandler.bind(this, "users")}
                            style={[styles.tabButton,
                            { borderWidth: userTapStyle }]} >
                            <Icon
                                style={styles.Icon}
                                name="users" color="#fff"
                                size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.tabHeandler.bind(this, "profile")}
                            style={[styles.tabButton,
                            { borderWidth: prifileTapStyle }]} >
                            <Icon
                                style={styles.Icon}
                                name="user" color="#fff"
                                size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={this.tabHeandler.bind(this, "phone")}
                            style={[styles.tabButton,
                            { borderWidth: phoneTapStyle }]} >
                            <Icon style={styles.Icon} name="phone" color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(1,18,148, 0.5)",
        flex: 1,
    },
    tabButton: {
        alignSelf: "center",
        backgroundColor: "rgba( 126, 163, 250, 0.1)",
        height: 38,
        borderRadius: 1000,
        width: 38,
        justifyContent: "center",
        borderColor: "#fff",
    },
    Icon: {
        alignSelf: "center"
    },
    tapContainer: {
        backgroundColor: "rgba( 126, 163, 250, 0.1)",
        height: 50,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderRadius: 5,
        borderColor: "#fff",
        borderWidth: 0.3,
        margin: 10,
        marginTop: 5

    },
    header: {
        backgroundColor: "rgba( 126, 163, 250, 0.10)",
        height: 50,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    headerHeadingView: {
        justifyContent: "center",
        flex: 2
    },
    headingText: {
        color: "#fff",
        fontWeight: "500"
    },
    headerButtonContainer: {
        justifyContent: "flex-end",
        flex: 1, flexDirection: "row",
    },
    headerButton: { alignSelf: "center" }

})