import {Header, Icon} from "react-native-elements";
import {Text} from "react-native";
import accountStyles from "../Styles/AccountStyleSheet";
import React from "react";

const SeedyFiubaHeader = ({navigation}) => {
    return(
        <Header
            leftComponent={<Icon
                name='menu'
                type='material'
                size={30}
                color='#fff'
                onPress={() => {
                    navigation.openDrawer()
                }}/>}
            centerComponent={<Text style={accountStyles.text}>
                SeedyFiuba
            </Text>}
            containerStyle={accountStyles.header}
        />
    )
}
export default SeedyFiubaHeader