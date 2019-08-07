import React, { Component } from 'react';
import { Text, View, ScrollView, ImageBackground, Dimensions, Image, TouchableOpacity, BackHandler, Alert, FlatList, Platform, } from 'react-native';
import BG from "../../../assets/bgapp2.jpg"
import Icon from "react-native-vector-icons/Feather"
import { FlatGrid } from 'react-native-super-grid';


const { height, width } = Dimensions.get("window")
export default class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            userArray: []
        }
    }

    componentDidMount() {
        fetch('http://192.168.18.35:8000/getUser', {
            method: "GET",
        }).then(res => res.json()
                .then(data => this.setState({ userArray: data.data })))
            .catch(err => console.log(err))
    }



    startChat(data) {
        const currentUser = this.props.currentUser
        this.props.navigation.navigate("ChatRoom", { data, currentUser })
    }



    render() {
        const { userArray } = this.state;
        return (
            <View style={{ flex: 1, }}>
                <FlatGrid
                    itemDimension={170}
                    items={userArray}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={this.startChat.bind(this, item)} activeOpacity={.6} style={{
                            height: height / 3 - 50,
                            backgroundColor: "rgba(126,163,250, 0.3)",
                            borderRadius: 5,
                            borderColor: "#fff",
                            borderWidth: .3,
                            justifyContent: "center",

                        }} >
                            <View style={{ height: 80, width: 80, borderColor: "#fff", borderWidth: 1, alignSelf: "center", borderRadius: height, }} >
                                <Image
                                    source={{ uri: "https://cdn-02.independent.ie/incoming/article36830790.ece/25f76/AUTOCROP/w620/13%20NEWS%20Cabinet%2014%20TB.jpg" }}
                                    resizeMode={"cover"}
                                    style={{ height: "100%", width: "100%", borderRadius: 567899 }} />
                            </View>
                            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "500", marginTop: 5 }} >{item.username}</Text>
                        </TouchableOpacity>)}
                />
            </View>
        )
    }
}



