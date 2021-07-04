import CustomPrincipalHeader from "../../component/CustomPrincipalHeader";
import {View} from "react-native";
import AccountAvatar from "../../component/account/AccountAvatar";
import AccountInformationCard from "../../component/account/AccountInformationCard";
import React from "react";

const CreatorScreen = ({route}) => {
    const creator = route.params.creator;
    return(
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
    )
}

export default CreatorScreen