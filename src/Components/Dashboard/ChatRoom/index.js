import React, { Component } from "react";
import { View, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Text, Image, Dimensions, FlatList, ScrollView, YellowBox } from "react-native";
import BG from "../../../assets/bgapp2.jpg"
import Icon from "react-native-vector-icons/Feather"
import io from "socket.io-client"



const { height } = Dimensions.get("window")
const socket = io("http://192.168.100.95:8000")




export default class ChatRoom extends Component {
    constructor() {
        super()
        this.state = {
            currentUser: {},
            conversetionID: "",
            messageArr: []
        }
    }

    componentDidMount() {
        // const { state } = this.props.navigation;
        // this.setState({
        //     conversetionID: state.params.data.conversetionID
        // })
        // socket.on(`GET_MESSAGE${state.params.data.conversetionID}`, data => {
        //     this.state.messageArr.push(data)
        //     this.setState({ messageArr: this.state.messageArr })
        // })
    }


    sendMesaage() {
        // const currentUser = this.props.navigation.state.params.currentUser;
        // const data = this.props.navigation.state.params.data;
        // const { conversetionID } = this.state;
        // this.setState({
        //     currentUser: currentUser
        // })

        // const conversetion = {
        //     conversetionIdS: [currentUser._id, data._id],
        //     senderID: currentUser._id,
        //     receiverID: data._id,
        // }


        // fetch(`http://192.168.100.95:8000/createConversation`, {
        //     method: "POST",
        //     body: JSON.stringify(conversetion),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // }).then(res => res.json()
        //     .then(data => {
        //         console.log(data, "====")
        //         socket.emit(`SEND_MESSAGE`, {
        //             message: "this.state.message",
        //             conversetionID: conversetionID,
        //             senderID: currentUser._id,
        //         })
        //     })
        // ).catch((err) => {
        //     console.log(err)
        // })
    }



    render() {

        const { messageArr } = this.state


        // let arr = []
        // for (let i = 0; i < 20; i++) {
        //     arr.push(
        //         <View key={i} style={i % 3 === 1 ? styles.message1 : styles.message2}>
        //             <Text style={{ color: "rgba( 250,250, 250,1)" }}>
        //                 Chat(message) bubble UI, both ios and android.
        //             </Text>
        //         </View>
        //     )

        // }




        return (
            <ImageBackground
                blurRadius={3}
                source={BG}
                resizeMode="stretch" style={{ flex: 1 }} >
                <View style={{ flex: 1, backgroundColor: "rgba(1,18,148, 0.5)" }} >
                    <View style={styles.header} >
                        <View style={styles.headerHeadingView} >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate("Dashboard")}
                                style={{
                                    width: 80, height: 45,
                                    paddingLeft: 5,
                                    paddingRight: 5,
                                    borderRadius: 1000,
                                    alignItems: "center", justifyContent: "space-between", flexDirection: "row",
                                }} >
                                <View activeOpacity={0.6}
                                    style={styles.headerButton}>
                                    <Icon style={styles.headerButton}
                                        name="arrow-left" color="#fff" size={22} />
                                </View>
                                <View style={{ height: 35, width: 35, borderColor: "#fff", borderWidth: 1, borderRadius: height }} >
                                    <Image
                                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7D4G4mrr6XojwT9FM_RJLBENlaaXAHy8ygIvy7i5jjwMix3yXMg" }}
                                        resizeMode={"cover"}
                                        style={{ height: "100%", width: "100%", borderRadius: 567899 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, }} >
                        <ScrollView>
                            {messageArr.map((val, ind) => {
                                // console.log(val)
                                return (
                                    <View key={ind}
                                    // style={i % 3 === 1 ? styles.message1 : styles.message2}
                                    >
                                        <Text style={{ color: "rgba( 250,250, 250,1)" }}>
                                            Chat(message) bubble UI, both ios and android.
                                        </Text>
                                    </View>
                                )
                            })}
                        </ScrollView>
                    </View>


                    <View style={{
                        backgroundColor: "rgba( 126, 163, 250, 0.1)",
                        height: 60,
                        justifyContent: "center",
                        borderRadius: 5,
                    }} >
                        <View style={{
                            backgroundColor: "rgba( 126, 163, 250, 0.1)",
                            height: 50,
                            justifyContent: "center",
                            flexDirection: "row",
                            borderRadius: 1000,
                            margin: 5,
                        }} >
                            <TouchableOpacity style={{
                                height: 50,
                                width: 50,
                                alignSelf: "center",
                                backgroundColor: "rgba( 126, 163, 250, 0.1)",
                                borderRadius: 100,
                                justifyContent: "center",
                                alignItems: "center"
                            }} >
                                <Icon name="camera" color="#fff" size={22} />
                            </TouchableOpacity>

                            <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }} >
                                <TextInput multiline={true} placeholderTextColor="#f2f2f2"
                                    style={{ paddingLeft: 10, color: "#f2f2f2" }} placeholder="Type message..." />
                            </View>
                            <TouchableOpacity
                                onPress={this.sendMesaage.bind(this)}
                                style={{
                                    height: 50,
                                    width: 50,
                                    alignSelf: "center",
                                    backgroundColor: "rgba( 126, 163, 250, 0.1)",
                                    borderRadius: 100,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }} >
                                <Icon name="send" color="#fff" size={22} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}



const styles = StyleSheet.create({
    header: {
        backgroundColor: "rgba( 126, 163, 250, 0.10)",
        height: 55,
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,

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
    headerButton: {
        alignSelf: "center"
    },
    message1: {
        color: "#fff",
        backgroundColor: "rgba( 250,250, 250, 0.3)",
        marginTop: 10,
        width: "80%",
        borderRadius: 10,
        margin: 15,
        padding: 10,
        alignSelf: "flex-start",
        // elevation: 0.5

    },
    message2: {
        color: "#fff",
        backgroundColor: "rgba(1,18,148, 0.3)",
        marginTop: 10,
        width: "80%",
        borderRadius: 10,
        margin: 15,
        padding: 10,
        alignSelf: "flex-end",
        // elevation: 1
    }

})