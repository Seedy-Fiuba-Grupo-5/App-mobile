import {Image, Text, View} from "react-native";
import React from "react";

const SeedyFiubaEmpty = ({title}) => {
    return(
        <View style={{paddingTop:120}}>
            <Image source={require('../images/empty.png')} style={{
                width: 160,
                height: 160,
                alignSelf: "center",
                margin: 10
            }}/>
            <Text style={
                {
                    color:'grey',
                    fontSize:30,
                    fontWeight:"bold",
                    alignSelf:'center'
                }
            }>
                {title}
            </Text>
        </View>
    )
}

export default SeedyFiubaEmpty
