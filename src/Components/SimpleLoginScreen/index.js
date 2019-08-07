
import React, { Component } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import styles from "../Login_signUpStyle/index"
import BG from "../../assets/bgapp2.jpg"
import Logo from "../../assets/logo2.png"
import AsyncStorage from '@react-native-community/async-storage';



export default class SimpleLoingScreen extends Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
        }
    }
    submit() {
        const { email, password } = this.state;
        fetch("http://192.168.18.35:8000/signin", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then(res => res.json()
            .then((data) => {
                if(data.message === "Login Successful"){
                    AsyncStorage.setItem("currentUser", JSON.stringify(data.user))
                    this.props.navigation.navigate("Dashboard")
                }
                else{
                    alert(data.message)
                }
            })).catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { email, password } = this.state;
        return (
            <ImageBackground
                blurRadius={2}
                source={BG}
                resizeMode="stretch" style={styles.container}>
                <ScrollView>
                    <View style={styles.ScrollView_View} >
                        <View style={[styles.ScrollViewContainet]}>
                            <View style={styles.logoContainer} >
                                <Image
                                    source={Logo}
                                    resizeMode={"stretch"}
                                    style={styles.logoImage} />
                            </View>
                        </View>
                        <View style={styles.ScrollViewContainet}>
                            <View style={{ flex: 1, }} >
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
                                    onPress={() => this.props.navigation.navigate("SimpleSignUpScreen")}
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
