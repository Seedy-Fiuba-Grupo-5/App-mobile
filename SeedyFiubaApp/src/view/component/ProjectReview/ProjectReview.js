import React, {useState} from "react";
import {Alert, Text, TouchableOpacity, View} from "react-native";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import ProjectReviewImage from "./ProjectReviewImage";
import ProjectReviewName from "./ProjectReviewName";
import ProjectReviewDescription from "./ProjectReviewDescription";
import ProjectReviewHashtags from "./ProjectReviewHashtags";
import ProjectReviewType from "./ProjectReviewType";
import ProjectReviewLocation from "./ProjectReviewLocation";
import ProjectReviewFinancialInfo from "./ProjectReviewFinancialInfo";
import styles from "../../Styles/StyleSheet";
import {Button, Overlay} from "react-native-elements";
import FormikPatchNameForm from "../Formik/FormikPatchNameForm";
import ProjectCardBottomItem from "../ProjectCardBottomItem";
import FormikPatchHashtagsForm from "../Formik/FormikPatchHashtagsForm";

const ProjectReview = (props) => {
    return (
        <>
            <View>
                <ProjectReviewImage editable={props.editable}/>
            </View>
            <View
                style={{
                    width:'92%',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                <ProjectReviewName name={props.project.name} id={props.project.id}
                                    editable={props.editable}/>

                <ProjectCardBottomItem projectField={'/USER/'}
                                       iconName={'user'}
                                       iconFamily={'font-awesome-5'}/>

                <ProjectReviewDescription name={props.project.description} id={props.project.id}
                                          editable={props.editable}/>

                <LinearProgress value={0.5}
                                color={'#009688'}
                                variant={"determinate"}/>
                <ProjectReviewFinancialInfo project={props.project}
                                            editable={props.editable}/>

            </View>
            <View style={{paddingVertical: 10,
                width:'92%',
                alignItems: 'center',
                alignSelf: 'center',}}>
                <ProjectReviewHashtags name={props.project.hashtags} id={props.project.id}
                                       editable={props.editable}/>
            </View>
            <View style={{ flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 20,}}>
                <ProjectReviewType name={props.project.type} id={props.project.id}
                                   editable={props.editable}/>
                <ProjectReviewLocation name={props.project.location} id={props.project.id}
                                       editable={props.editable}/>
            </View>
            <View
                style={{paddingTop: 7,}}>
                <Button title={'Support'}
                        disabled={props.editable}
                        buttonStyle={styles.button}
                        titleStyle={styles.formButtonTitle}
                        onPress={() => {
                            Alert.alert('FUNCTION NOT IMPLEMENTED')
                        }}
                />
            </View>
        </>
    )
}
export default ProjectReview;