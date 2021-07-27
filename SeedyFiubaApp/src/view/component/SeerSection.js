import {Text, View} from "react-native";
import React from "react";
import SeerReleaseFunds from "./SeerReleaseFunds";

const SeerSection = ({stagesCost, projectId, stagesStates,onSuccess}) => {
    return(
        <View>
            {
                stagesCost.map((value, index, values) => {
                    return (
                        <SeerReleaseFunds
                            key={index}
                            stage={index}
                            cost={value}
                            projectId={projectId}
                            wasReleased={stagesStates[index]}
                            onSuccess={onSuccess}
                        />
                    )
                })
            }
            <Text/>
        </View>
    )
}
export default SeerSection