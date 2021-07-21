import {Card} from "react-native-paper";
import {Text, View} from "react-native";
import React from "react";

const AccountWalletInformationCard = ({styles,address,privateAddress,balance}) => {

    return (
        <Card style={[{borderRadius: 15, elevation: 5}, styles]}>
            <Card.Title  title="Wallet" titleStyle={{fontSize:25}}/>
            <Card.Content>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Address:</Text>
                    <Text style={{fontSize: 22}}>{address}</Text>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Private Address:</Text>
                    <Text style={{fontSize: 22}}>{privateAddress}</Text>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Balance:</Text>
                    <Text style={{fontSize: 22}}>{balance}</Text>
                </View>
            </Card.Content>
        </Card>
    )

}
export default AccountWalletInformationCard