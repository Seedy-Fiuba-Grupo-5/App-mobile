import React from "react";
import {Text, View} from "react-native";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";

const ProjectCardFinancialInfo = (props) => {
    return (
        <View>
            <LinearProgress value={0.5}
                            color={'#009688'}
                            variant={"determinate"}/>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    paddingTop:10,
                }}>
                <View
                    style={{paddingRight: 7,
                    }}>
                    <Text style={{
                        color: '#757575',
                        fontWeight: "bold",
                    }}>
                        Ends on:
                    </Text>
                    <Text style={{
                        color: '#757575',
                    }}>
                        {props.project.endDate}
                    </Text>
                </View>
                <View
                    style={{paddingRight: 7}}>
                    <Text style={{
                        color: '#009688',
                        fontWeight: "bold",
                    }}>
                        AR$ 0
                    </Text>
                    <Text style={{
                        color: '#757575',
                    }}>
                        pledged of AR$ {props.project.goal}
                    </Text>
                </View>
                <View
                    style={{paddingRight: 7}}>
                    <Text style={{
                        color: '#757575',
                        fontWeight: "bold",
                    }}>
                        0
                    </Text>
                    <Text style={{
                        color: '#757575',
                    }}>
                        Supporters
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default ProjectCardFinancialInfo