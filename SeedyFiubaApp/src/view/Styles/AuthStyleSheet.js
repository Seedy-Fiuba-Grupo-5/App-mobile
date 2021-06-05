import {StyleSheet} from "react-native";

const loginStyles = StyleSheet.create({
    textLabel:{
        width: '80%',
        paddingLeft: "12.5%",
        paddingBottom: "1%",
        color: "#86939e",
        fontSize: 16,
        fontWeight: "bold"
    },
    inputContainer:{
        width: '80%',
        alignSelf: 'center'
    },
    loginButton: {
        margin:5,
        backgroundColor: '#4b1e4d',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
    registerButton: {
        margin:5,
        backgroundColor: '#86939e',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    }
});
export default loginStyles