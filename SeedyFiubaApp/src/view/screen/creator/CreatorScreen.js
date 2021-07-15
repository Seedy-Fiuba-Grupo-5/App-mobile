import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import {Text, View} from "react-native";
import AccountAvatar from "../../component/account/AccountAvatar";
import AccountInformationCard from "../../component/account/AccountInformationCard";
import React from "react";
import {Header, Icon, Overlay} from "react-native-elements";
import accountStyles from "../../Styles/AccountStyleSheet";
import ProjectEdit from "../../component/project/ProjectEdit";
import CreatorMessage from "../../component/creator/CreatorMessage";

const CreatorScreen = ({navigation,route}) => {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const creator = route.params.creator;
    return(
        <>
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
                        Creator
                    </Text>}
                rightComponent={
                    <Icon
                        name='send'
                        type='material'
                        size={28}
                        color='#fff'
                        onPress={() => {
                            showModal();
                        }}/>
                }
                containerStyle={accountStyles.header}
            />
            <Overlay isVisible={visible} onBackdropPress={hideModal} overlayStyle={{height:200,width:300}}>
                <CreatorMessage/>
            </Overlay>
            <View style={{flex: 1, alignContent: 'center'}}>
                <View style={{flex: 2, alignItems: 'center'}}>
                    <AccountAvatar name={{firstName:creator.firstName,lastName:creator.lastName}}/>
                </View>
                <View style={{flex: 3,margin:20}}>
                    <AccountInformationCard firstName={creator.firstName}
                                            lastName={creator.lastName}
                                            email={creator.email}/>
                </View>
            </View>
        </>

    )
}

export default CreatorScreen