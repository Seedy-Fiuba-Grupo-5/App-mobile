import {StyleSheet} from "react-native";

const CreateProjectStyle = StyleSheet.create({
    titleText:{
        paddingTop:'15%',
        paddingBottom:'5%',
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
    androidPicker: {
        width: '80%',
        alignSelf: 'center',
        paddingBottom:25,
        fontSize:35,
        color:'black',

    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
        marginTop: 6,
        textAlign: 'left',
        width: '80%',
        paddingLeft: "14.5%",
    },

});
export default CreateProjectStyle