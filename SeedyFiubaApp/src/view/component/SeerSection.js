import {Text, View} from "react-native";
import React from "react";
import SeerReleaseFunds from "./SeerReleaseFunds";

const SeerSection = ({stagesCost, projectId, stagesStates}) => {
    return(
        <View>
            {
                stagesCost.map((value, index, values) => {
                    console.log(stagesStates[index]);
                    return (
                        <SeerReleaseFunds
                            key={index}
                            stage={index}
                            cost={value}
                            projectId={projectId}
                            wasReleased={stagesStates[index]}
                        />
                    )
                })
            }
            <Text/>
        </View>
    )
}
export default SeerSection