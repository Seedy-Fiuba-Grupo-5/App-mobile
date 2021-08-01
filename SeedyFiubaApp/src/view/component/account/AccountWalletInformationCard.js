import {Card} from "react-native-paper";
import {Text, TouchableOpacity, View, Clipboard, ToastAndroid} from "react-native";
import React from "react";
import * as Linking from 'expo-linking';
import {Icon} from "react-native-elements";

const AccountWalletInformationCard = ({styles,address,privateKey,balance}) => {
    const copyToClipboard = (text, message) => {
        Clipboard.setString(text);
        ToastAndroid.show(message,ToastAndroid.SHORT);
    }

    const openUrl = () => {
        Linking.canOpenURL('https://linkfaucet.protofire.io/kovan')
            .then((data)=>{
                if(data){
                    Linking.openURL('https://linkfaucet.protofire.io/kovan');
                }
            })
            .catch((error)=>{
                ToastAndroid.show('We cant open link',ToastAndroid.SHORT);
            })
    }
    return (
        <Card style={[{borderRadius: 15, elevation: 5}, styles]}>
            <Card.Title  title="Wallet" titleStyle={{fontSize:25}}/>
            <Card.Content>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Balance:</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize: 35}}>{balance}</Text>
                        <Icon name='add-circle-outline'
                              type='material'
                              onPress={()=>{openUrl()}}
                              containerStyle={{paddingTop:8}}
                              size={35}
                              color='#4b1e4d'/>
                    </View>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Address:</Text>
                    <TouchableOpacity onPress={()=>{copyToClipboard(address,'Address Copied')}}>
                        <Text style={{fontSize: 20}}>{address}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{padding:2}}>
                    <Text style={{fontSize: 20, color: 'grey'}}>Private Key:</Text>
                    <TouchableOpacity onPress={()=>{copyToClipboard(privateKey,'Private key Copied')}}>
                        <Text style={{fontSize: 20}}>{privateKey}</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    )

}
export default AccountWalletInformationCard