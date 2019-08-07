import React, { Component } from 'react';
import { Text, View, ScrollView, ImageBackground, Dimensions, Image, TouchableOpacity, BackHandler, Alert, Platform, } from 'react-native';
import BG from "../../../assets/bgapp2.jpg"
import Icon from "react-native-vector-icons/Feather"
import AsyncStorage from '@react-native-community/async-storage';


const { height, width } = Dimensions.get("window")
export default class ChatList extends Component {
    constructor() {
        super()
        this.state = {
            chats: [],
            currentUser: {}
        }

    }

    componentDidMount() {
        let arr = []
        AsyncStorage.getItem("currentUser")
            .then((snap) => {
                const currentUser = JSON.parse(snap)
                this.setState({
                    currentUser: currentUser
                })
                fetch('http://192.168.18.35:8000/getConversation?currentUser=' + currentUser._id, {
                    method: "GET",
                }).then(res => res.json().then(data => {
                    data.map((val) => {
                        console.log(val)
                        if (val._id !== currentUser._id) {
                            arr.push(val)
                        }
                    })
                    this.setState({
                        chats: arr
                    })
                })).catch(err => console.log(err))
            })
    }



    render() {
        const { chats, currentUser } = this.state
        return (
            <View style={{ flex: 1, }}>
                <ScrollView>
                    <View style={{ paddingLeft: "1%", paddingRight: "1%" }} >
                        {chats.map((val, ind) => {
                            return (
                                <TouchableOpacity activeOpacity={.6}
                                    onPress={() => this.props.navigation.navigate("ChatRoom", { data: val, currentUser })}
                                    key={ind} style={{
                                        width: "98%",
                                        marginTop: "1%",
                                        marginBottom: "1%",
                                        backgroundColor: "rgba(126,163,250, 0.3)",
                                        borderRadius: 5,
                                        alignSelf: "center",
                                        flexDirection: "row",
                                        borderColor: "#fff",
                                        borderWidth: 0.3,
                                    }} >
                                    <View style={{ height: 80, width: 80, justifyContent: "center", alignItems: "center" }} >
                                        <View style={{ height: 60, width: 60, borderColor: "#fff", borderWidth: 1, borderRadius: height }} >
                                            <Image
                                                source={{ uri: "https://cdn-02.independent.ie/incoming/article36830790.ece/25f76/AUTOCROP/w620/13%20NEWS%20Cabinet%2014%20TB.jpg" }}
                                                resizeMode={"cover"}
                                                style={{ height: "100%", width: "100%", borderRadius: 567899 }} />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, height: 80, justifyContent: "center", }} >
                                        <Text style={{ color: "#fff", fontWeight: "400", fontSize: 13, fontWeight: "500" }} >{val.username}</Text>
                                        <Text style={{ color: "#fff", fontWeight: "400", fontSize: 10 }} >{"This is our last message"}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
            // </ImageBackground>
        )
    }
}