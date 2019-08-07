import { StyleSheet, Dimensions, } from 'react-native';
const { height } = Dimensions.get("window");





export default StyleSheet.create({
    container: {
        flex: 1,
    },
    ScrollViewContainet: {
        height: height / 2,
    },
    logoImage: {
        height: 150,
        width: 150,
        alignSelf: "center"
    },
    TextInputView: {
        // backgroundColor: "#fff",
        backgroundColor: "rgba( 126, 163, 250, 0.3)",

        width: "85%",
        height: 45,
        alignSelf: "center",
        marginTop: 10,
        // borderRadius: 100,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        

    },
    TextInput: {
        flex: 1,
        color: "#fff",
        backgroundColor: "rgba( 126, 163, 250, 0.1)",
        fontSize: 13,
        padding: 5,
        paddingLeft: 20,

    },
    logoContainer: {
        flex: 1,
        justifyContent: "center",
    },
    ScrollView_View: {
        backgroundColor: "rgba(1,18,148, 0.5)"
    },
    TouchableOpacity_btn: {
        width: "85%",
        height: 45, alignSelf: "center",
        marginTop: 20,
        //  borderRadius: 100,
        borderColor: "#fff",
        borderWidth: 1,
        justifyContent: "center"
    },
    buttontext: {
        alignSelf: "center",
        color: "#fff"
    }

});

