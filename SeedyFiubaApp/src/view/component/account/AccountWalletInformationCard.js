import {Card} from "react-native-paper";
import {Text, View} from "react-native";
import React from "react";

const AccountWalletInformationCard = ({styles}) => {

    return (
        <Card style={[{borderRadius: 15, elevation: 5, marginTop:10,marginBottom:10}, styles]}>
            <Card.Title  title="Wallet" titleStyle={{fontSize:25}}/>
            <Card.Content>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Address:</Text>
                    <Text style={{fontSize: 22}}>ASJDED8SDJJJDU3UD</Text>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Balance:</Text>
                    <Text style={{fontSize: 22}}>3000 E</Text>
                </View>
            </Card.Content>
        </Card>
    )

}
export default AccountWalletInformationCard