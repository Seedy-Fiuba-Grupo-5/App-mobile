import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ProjectCardFinancialInfo from "../component/ProjectCardFinancialInfo";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";

import ProjectReviewImage from "./ProjectReviewImage";
import ProjectCardBottomItem from "./ProjectCardBottomItem";
import {Overlay} from "react-native-elements";
import FormikPatchNameForm from "./Formik/FormikPatchNameForm";
import ProjectReviewName from "./ProjectReviewName";
import ProjectReviewDescription from "./ProjectReviewDescription";

const ProjectReview = (props) => {
    return (
        <>
            <View>
                <ProjectReviewImage/>
            </View>
            <View
                style={{
                    width:'92%',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <ProjectReviewName name={props.project.name} id={props.project.id}/>
                <ProjectReviewDescription name={props.project.description} id={props.project.id}/>

                <LinearProgress value={0.5}
                                color={'#009688'}
                                variant={"determinate"}/>
                <ProjectCardFinancialInfo project={props.project}/>

            </View>
            <View style={{paddingVertical: 10,
                width:'92%',
                alignItems: 'center',
                alignSelf: 'center',}}>
                <ProjectCardBottomItem projectField={props.project.hashtags}
                                       iconName={'tag'}
                                       iconFamily={'font-awesome-5'}/>
            </View>
            <View style={{ flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 20,}}>
                <ProjectCardBottomItem projectField={props.project.type}
                                       iconName={'lightbulb'}
                                       iconFamily={'font-awesome-5'}/>
                <ProjectCardBottomItem projectField={props.project.location}
                                       iconName={'map-marker-alt'}
                                       iconFamily={'font-awesome-5'}/>
            </View>

        </>
    )
}
export default ProjectReview;