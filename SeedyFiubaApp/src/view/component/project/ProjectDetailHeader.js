import {Header, Icon} from "react-native-elements";
import {Text} from "react-native";
import accountStyles from "../../Styles/AccountStyleSheet";
import React from "react";

const ProjectDetailHeader = ({params, navigation}) =>{
    return(
        <Header
            leftComponent={
                <Icon
                    name='arrow-back'
                    type='material'
                    size={30}
                    color='#fff'
                    onPress={() => {
                        navigation.goBack();
                    }}/>}
            centerComponent={
                <Text
                    style={accountStyles.text}>
                    {params.project.name}
                </Text>}
            rightComponent={
                params.editable?
                    (<Icon
                        name='edit'
                        type='material'
                        size={30}
                        color='#fff'
                        onPress={() => {
                            console.log('edit');
                        }}/>):
                    (<Icon
                        name='favorite-border'
                        type='material'
                        size={30}
                        color='#fff'
                        onPress={() => {
                            console.log('save');
                        }}/>)
            }
            containerStyle={accountStyles.header}
        />
    )
}
export default ProjectDetailHeader