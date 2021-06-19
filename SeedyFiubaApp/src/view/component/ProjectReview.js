import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../Styles/StyleSheet";
import ProjectCardFinancialInfo from "../component/ProjectCardFinancialInfo";
import LinearProgress from "react-native-elements/dist/linearProgress/LinearProgress";

import ProjectReviewImage from "./ProjectReviewImage";
import ProjectCardBottomItem from "./ProjectCardBottomItem";
import {Button, Overlay} from "react-native-elements";
import NewProjectForm from "./NewProjectForm";
import FormikPatchDescriptionForm from "./Formik/FormikPatchDescriptionForm";
import ApiProject from "../../model/ApiProject";
import FormikPatchNameForm from "./Formik/FormikPatchNameForm";

const ProjectReview = (props) => {
    const [visible, setVisible] = useState(false);
    const [overlayLabel, setOverlayLabel] = useState('');
    const [value, setValue] = useState('')
    const [project, setProject] = useState(props.project)

    const toggleOverlay = () => {
        setVisible(!visible);
        const apiProject = new ApiProject()
        apiProject.getProject(props.project.id).then((data) => {
            setProject(data);
        })
    };

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
                <TouchableOpacity onPress={() => {
                    toggleOverlay();
                    setOverlayLabel('Project Name');
                    setValue(project.name);
                }}>
                    <Text style={styles.titleText}>{project.name}</Text>
                </TouchableOpacity>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <FormikPatchNameForm label={overlayLabel}
                                                currentValue={value}
                                                project={project}/>
                </Overlay>

                <TouchableOpacity disabled={true}
                    onPress={() => {
                    toggleOverlay();
                    setOverlayLabel('Project Description');
                    setValue(project.description);
                }}>
                    <Text style={styles.projectDescription}>
                        {project.description}
                    </Text>
                </TouchableOpacity>

                <LinearProgress value={0.5}
                                color={'#009688'}
                                variant={"determinate"}/>
                <ProjectCardFinancialInfo project={project}/>

            </View>
            <View style={{paddingVertical: 10,
                width:'92%',
                alignItems: 'center',
                alignSelf: 'center',}}>
                <ProjectCardBottomItem projectField={project.hashtags}
                                       iconName={'tag'}
                                       iconFamily={'font-awesome-5'}/>
            </View>
            <View style={{ flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 20,}}>
                <ProjectCardBottomItem projectField={project.type}
                                       iconName={'lightbulb'}
                                       iconFamily={'font-awesome-5'}/>
                <ProjectCardBottomItem projectField={project.location}
                                       iconName={'map-marker-alt'}
                                       iconFamily={'font-awesome-5'}/>
            </View>

        </>
    )
}
export default ProjectReview;