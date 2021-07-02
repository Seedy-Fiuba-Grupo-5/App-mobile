import {StyleSheet} from "react-native";

const loginStyles = StyleSheet.create({
    titleText:{
        paddingTop:'12%',
        paddingBottom:'4%',
        color: "#4b1e4d",
        fontSize: 25,
        fontWeight: "bold",
        alignSelf:'center',
    },
    inputContainer:{
        width: '80%',
        alignSelf: 'center'
    },
    principalButton: {
        margin:5,
        backgroundColor: '#4b1e4d',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
    secondButton: {
        margin:5,
        backgroundColor: '#86939e',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
    googleButton:{
        margin:5,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
    googleTitleButton:{
        color:'#4b1e4d'
    }
});
export default loginStyles