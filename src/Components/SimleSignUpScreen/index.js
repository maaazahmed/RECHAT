import React, { Component } from 'react';
import styles from "../Login_signUpStyle/index";
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



export default class SimpleLoingScreen extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            email: "",
            password: ""
        }
    }

    submit() {
        const { username, email, password } = this.state;
        fetch("http://192.168.18.35:8000/signup", {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()
            .then((data) => {
                AsyncStorage.setItem("currentUser", JSON.stringify(data.user))
                this.props.navigation.navigate("Dashboard")
            })).catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { username, email, password } = this.state;
        return (
            <ImageBackground
                blurRadius={2}
                source={require("../../assets/bgapp2.jpg")}
                resizeMode="stretch" style={styles.container}>
                <ScrollView>
                    <View style={styles.ScrollView_View} >
                        <View style={[styles.ScrollViewContainet]}>
                            <View style={styles.logoContainer} >
                                <Image
                                    source={require("../../assets/logo2.png")}
                                    resizeMode={"stretch"}
                                    style={styles.logoImage} />
                            </View>
                        </View>
                        <View style={styles.ScrollViewContainet}>
                            <View style={{ flex: 1, }} >
                                <View style={styles.TextInputView} >
                                    <TextInput
                                        value={username}
                                        onChangeText={username => this.setState({ username })}
                                        style={styles.TextInput}
                                        placeholder="Username" />
                                </View>
                                <View style={styles.TextInputView}>
                                    <TextInput
                                        value={email}
                                        onChangeText={email => this.setState({ email })}
                                        style={styles.TextInput}
                                        placeholder="Email" />
                                </View>

                                <View style={styles.TextInputView} >
                                    <TextInput
                                        value={password}
                                        onChangeText={password => this.setState({ password })}
                                        style={styles.TextInput}
                                        placeholder="Password"
                                        secureTextEntry={true} />
                                </View>
                                <TouchableOpacity
                                    onPress={this.submit.bind(this)}
                                    style={styles.TouchableOpacity_btn} >
                                    <Text style={styles.buttontext} >SIGN IN</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate("SimpleLoginScreen")}
                                    style={[styles.TouchableOpacity_btn, { marginTop: 30 }]} >
                                    <Text style={styles.buttontext} >SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}
