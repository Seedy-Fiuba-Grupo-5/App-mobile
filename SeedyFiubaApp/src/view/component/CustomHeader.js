import {Header, Icon} from "react-native-elements";
import {Text} from "react-native";
import accountStyles from "../Styles/AccountStyleSheet";
import React from "react";

const CustomHeader = ({navigation,title}) => {
    return(
        <Header
            leftComponent={<Icon
                name='arrow-back'
                type='material'
                size={30}
                color='#fff'
                onPress={() => {
                    navigation.goBack();
                }}/>}
            centerComponent={<Text style={accountStyles.text}>
                {title}
            </Text>}
            containerStyle={accountStyles.header}
        />
    )
}
export default CustomHeader