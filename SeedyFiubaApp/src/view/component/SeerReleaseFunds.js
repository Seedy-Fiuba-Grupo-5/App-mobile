import {Text, View} from "react-native";
import SeedyFiubaButton from "./SeedyFiubaButton";
import ProjectEditStyleSheet from "../Styles/ProjectEditStyleSheet";
import React from "react";

const SeerReleaseFunds = ({stage, cost}) => {
    return(
        <View>
            <View style={{flexDirection:"row", justifyContent:'space-between', paddingBottom:5}}>
                <Text style={{fontSize:20}}>Stage {stage+1}</Text>
                <Text style={{fontSize:20}}> Amount: {parseFloat(cost).toFixed(2)} $ </Text>
            </View>
            <SeedyFiubaButton
                title={"Complete Stage " + (stage+1)}
                onPress={()=>{console.log('ReleaseFunds')}}
                style={{
                    margin:2,
                    backgroundColor: '#4b1e4d',
                    borderRadius: 15,
                    width: '50%',
                    alignSelf: 'center'
                }}
                titleStyle={ProjectEditStyleSheet.title}/>
        </View>
    )
}
export default SeerReleaseFunds