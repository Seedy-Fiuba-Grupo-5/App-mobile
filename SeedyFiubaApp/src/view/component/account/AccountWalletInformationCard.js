import {Card} from "react-native-paper";
import {Text, TouchableOpacity, View, Clipboard, ToastAndroid} from "react-native";
import React from "react";

const AccountWalletInformationCard = ({styles,address,privateKey,balance}) => {
    const copyToClipboard = () => {
        Clipboard.setString(address);
        ToastAndroid.show('Address Copied',ToastAndroid.SHORT);
    }
    return (
        <Card style={[{borderRadius: 15, elevation: 5}, styles]}>
            <Card.Title  title="Wallet" titleStyle={{fontSize:25}}/>
            <Card.Content>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Balance:</Text>
                    <Text style={{fontSize: 35}}>{balance}</Text>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Address:</Text>
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Text style={{fontSize: 20}}>{address}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Private Key:</Text>
                    <Text style={{fontSize: 20}}>{privateKey}</Text>
                </View>
            </Card.Content>
        </Card>
    )

}
export default AccountWalletInformationCard