import React from "react";
import {Text, View} from "react-native";
import {Card} from 'react-native-paper';

const AccountInformationCard = ({firstName, lastName, email, styles}) => {
    return (
        <Card style={[{borderRadius: 20, elevation: 10}, styles]}>
            <Card.Title  title="Information" titleStyle={{fontSize:25}}/>
            <Card.Content>
                    <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
                        <View style={{padding:5}}>
                            <Text style={{fontSize: 20, color: 'grey'}}>First Name:</Text>
                            <Text style={{fontSize: 22}}>{firstName}</Text>
                        </View>
                        <View style={{padding:5}}>
                            <Text style={{fontSize: 20, color: 'grey'}}>Last Name:</Text>
                            <Text style={{fontSize: 22}}>{lastName}</Text>
                        </View>
                    </View>
                    <View style={{padding:5}}>
                        <Text style={{fontSize: 20, color: 'grey'}}>Email:</Text>
                        <Text style={{fontSize: 22}}>{email}</Text>
                    </View>
            </Card.Content>
        </Card>
    )
}
export default AccountInformationCard