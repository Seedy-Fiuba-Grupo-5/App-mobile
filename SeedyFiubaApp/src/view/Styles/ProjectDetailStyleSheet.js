import {StyleSheet} from "react-native";

const ProjectDetailStyleSheet = StyleSheet.create({
    ImageStyle: {
        width: 320,
        height: 220
    },
    ImageContainerStyle: {
        alignSelf: "center"
    },
    creator:{
        color: '#85929d',
        fontSize: 18
    },
    hashtags:{
        color: '#85929d',
        fontSize: 18,
        alignSelf: 'center'
    },
    button: {
        margin:5,
        backgroundColor: '#4b1e4d',
        borderRadius: 15,
        width: '80%',
        alignSelf: 'center'
    },
});
export default ProjectDetailStyleSheet