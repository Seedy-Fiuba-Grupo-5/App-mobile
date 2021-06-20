import React from "react";
import {View} from "react-native";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";
import ProjectReviewImage from "./ProjectReviewImage";
import ProjectReviewName from "./ProjectReviewName";
import ProjectReviewDescription from "./ProjectReviewDescription";
import ProjectReviewHashtags from "./ProjectReviewHashtags";
import ProjectReviewType from "./ProjectReviewType";
import ProjectReviewLocation from "./ProjectReviewLocation";
import ProjectReviewFinancialInfo from "./ProjectReviewFinancialInfo";

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

        </>
    )
}
export default ProjectReview;