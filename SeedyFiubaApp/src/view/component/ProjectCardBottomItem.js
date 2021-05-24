import React from "react";
import {Text, View} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const ProjectCardBottomItem = (props) => {
    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}>
                <Icon
                    raised
                    name={props.iconName}
                    type={props.iconFamily}
                    color='black'/>
                <Text
                    style={{
                        paddingLeft: 2,
                        color: '#757575',
                    }}>
                    {props.projectField}
                </Text>
            </View>
        </>
    )
}
export default ProjectCardBottomItem