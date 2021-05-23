import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    baseText: {
        textAlign: "center",
    },
    titleText: {
        borderTopWidth: 5,
        fontSize: 30,
        paddingVertical:12,
        paddingLeft: 45,
        fontWeight: "bold",
        textAlign: "left",
    },
    button: {
        backgroundColor: '#3F51B5',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
    formContainerStyle: {
        width: '80%',
        alignSelf: 'center'
    },

    image: {
        flex: 1,
        width: 70,
        height: 70,
        resizeMode: 'contain' },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
        marginTop: 6,
        textAlign: 'left',
        width: '80%',
        paddingLeft: "14.5%",
    },
    labelText: {
        width: '80%',
        paddingLeft: "12.5%",
        paddingBottom: "1%",
        color: "#86939e",
        fontSize: 16,
        fontWeight: "bold"
    },
    pickerStyle: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderRadius: 0,
        color: 'black',
        width: '75%',
        alignSelf: 'center',
        paddingBottom: 15,
        paddingLeft: 22, // to ensure the text is never behind the icon
    },

    pickerIconContainerStyle: {
        top: 10,
        left:47,
    },

    placeholder: {
        color: "#86939e",
        fontSize: 18,
    },

    placeholderText: {
        color: "#86939e",
        fontSize: 18,
        paddingLeft: 5,
    },

    enteredDataText: {
        color: "black",
        fontSize: 18,
        paddingLeft: 5,
    },

    formOnTouchableOpacity: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: 'gray',
        color: 'black',
        width: '75%',
        alignSelf: 'center',
        paddingBottom: 15,
        paddingLeft: 1, // to ensure the text is never behind the icon
    },

    formButtonTitle : {
        fontSize: 20
    },

    projectCard: {
        borderWidth: 2,
        backgroundColor: "#FFFFFF",
        borderColor: "#6f6e6e",
        borderRadius: 20,
        elevation:5
    }

});
export default styles