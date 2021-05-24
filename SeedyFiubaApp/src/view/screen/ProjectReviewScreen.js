import React from "react";
import {Image, Text, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ProjectCardFinancialInfo from "../component/ProjectCardFinancialInfo";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import Icon from "react-native-vector-icons/FontAwesome5";

const ProjectReviewScreen = ({route}) => {
    return (
        <>
            <View
                style={{
                    width:'95%',
                    height: 220,
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <Image source={require('../images/default.jpg')}
                       resizeMode={'contain'}
                       style={{
                           flex: 1,
                           alignSelf: 'stretch',
                           width: undefined,
                           height: undefined
                       }}
                />
            </View>
            <View
                style={{
                    width:'92%',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <Text style={styles.titleText}>
                    {route.params.project.name}
                </Text>
                <Text style={styles.projectDescription}>
                    {route.params.project.description}
                </Text>
                <LinearProgress value={0.5}
                                color={'#009688'}
                                variant={"determinate"}/>
                <ProjectCardFinancialInfo project={route.params.project}/>
            </View>

            <View
                style={{ flex: 1,
                    flexDirection: 'row',
                    paddingTop:10,}}>
                <Icon
                    raised
                    name='tag'
                    type='font-awesome-5'
                    color='grey'/>
                <Text>
                    {route.params.project.hashtags}
                </Text>
                <Icon
                    raised
                    name='lightbulb'
                    type='font-awesome-5'
                    color='grey'/>
                <Text>
                    {route.params.project.type}
                </Text>
                <Icon
                    raised
                    name='map-marker-alt'
                    type='font-awesome-5'
                    color='grey'/>
                <Text>
                    {route.params.project.location}
                </Text>
            </View>


        </>

    )
}
export default ProjectReviewScreen;