import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    baseText: {
        textAlign: "center",
    },
    titleText: {
        borderTopWidth: 5,
        fontSize: 30,
        paddingVertical:2.5,
        fontWeight: "bold",
        textAlign: "left",
    },
    button: {
        margin:10,
        backgroundColor: "#4b1e4d",
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
    formContainerStyle: {
        width: '80%',
        alignSelf: 'center'
    },

    image: {
        resizeMode: 'cover'},

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
        width: '100%',
        alignSelf: 'center',
        borderWidth: 0,
        backgroundColor: "transparent",
        borderColor: "#6f6e6e",
    },

    projectDescription: {
        paddingBottom:5,
        color: '#757575',
    },

    projectCardItemsView: {
        borderColor: '#BDBDBD',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        paddingHorizontal: 2.5,
    },

    projectCardTitle: {
        fontSize: 20,
    },

    projectCardText: {
        color: '#757575',
    },


});
export default styles