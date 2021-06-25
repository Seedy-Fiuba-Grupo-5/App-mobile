import {ScrollView, View} from "react-native";
import NewProjectForm from "../../component/NewProjectForm";
import React from "react";
import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";

const NewProjectScreen = ({navigation}) => {
    return (
        <View>
            <CustomPrincipalHeader navigation={navigation} title={'New Project'}/>
            <ScrollView
                keyboardShouldPersistTaps='always'>
                <NewProjectForm
                    navigation={navigation}/>
            </ScrollView>
        </View>
    )
}
export default NewProjectScreen