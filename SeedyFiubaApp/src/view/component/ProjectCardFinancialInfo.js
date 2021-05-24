import React from "react";
import {Text, View} from "react-native";
import styles from "../Styles/StyleSheet";

const ProjectCardFinancialInfo = (props) => {
    return (
        <View>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    paddingTop:10,
                }}>
                <View
                    style={{paddingRight: 7}}>
                    <Text style={{
                        color: '#009688',
                        fontWeight: "bold",
                    }}>
                        AR$ 0
                    </Text>
                    <Text style={styles.projectCardText}>
                        pledged of AR$ {props.project.goal}
                    </Text>
                </View>
                <View
                    style={{paddingRight: 7,
                    }}>
                    <Text style={{
                        color: '#757575',
                        fontWeight: "bold",
                    }}>
                        Ends on:
                    </Text>
                    <Text style={styles.projectCardText}>
                        {props.project.endDate}
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
                    <Text style={styles.projectCardText}>
                        Supporters
                    </Text>
                </View>
            </View>
        </View>
    )
}
export default ProjectCardFinancialInfo