import {Text, View} from "react-native";
import React from "react";
import SeerReleaseFunds from "./SeerReleaseFunds";

const SeerSection = ({stagesCost}) => {
    return(
        <View>
            {
                stagesCost.map((value, index, values) => {
                    return (
                        <SeerReleaseFunds key={index} stage={index} cost={value}/>
                    )
                })
            }
            <Text/>
        </View>
    )
}
export default SeerSection