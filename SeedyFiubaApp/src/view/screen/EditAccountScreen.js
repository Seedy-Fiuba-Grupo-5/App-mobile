import React from "react";
import {Text, View} from "react-native";
import {Header, Icon} from "react-native-elements";
import accountStyles from "../Styles/AccountStyleSheet";
const EditAccountScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, alignContent: 'center'}}>
            <Header
                leftComponent={<Icon
                    name='close'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {
                        navigation.goBack();
                    }}/>}
                centerComponent={<Text style={accountStyles.text}>
                    Edit Account
                </Text>}
                rightComponent={<Icon
                    name='done'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {
                        console.log('save');
                    }}/>}
                containerStyle={accountStyles.header}
            />
        </View>
    )
}
export default EditAccountScreen