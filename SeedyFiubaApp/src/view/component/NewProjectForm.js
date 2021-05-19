import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements'
import {KeyboardAvoidingView, ToastAndroid} from "react-native";
import styles from "../Styles/StyleSheet";
import ApiProject from "../../model/ApiProject";

const NewProjectForm = (props) => {
    const [name, setName] = useState("");
    const nameInput = React.createRef();
    const showMessage = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    const newProject = () =>{
        if(name){
            const apiProjects = new ApiProject();
            apiProjects.post(name)
                .then((data) => {
                    if(data){
                        showMessage("Project Create");
                        nameInput.current.clear();
                    }
                })
                .catch((error) => {});
        }
    }
    return(
        <KeyboardAvoidingView behavior={'padding'}>
                <Input label={"Project Name"}
                       placeholder="My Awesome Project"
                       containerStyle={styles.formContainerStyle}
                       autoFocus={true}
                       ref={nameInput}
                       onChangeText={newName => setName(newName)}/>

                <Input label={"Project Description"}
                       placeholder='The most holesome project'
                       multiline={true}
                       containerStyle={styles.formContainerStyle}
                />

                <Input label={"Hashtags"}
                       placeholder='#LEGENDARY'
                       containerStyle={styles.formContainerStyle}
                />

                <Input label={"Proyect Type"}
                       placeholder='Awesome Type'
                       containerStyle={styles.formContainerStyle}
                />

                <Input label={"Goal"}
                       placeholder='$125550'
                       keyboardType={'numeric'}
                       containerStyle={styles.formContainerStyle}
                />

                <Input label={"End Date"}
                       placeholder='14/05/2022'
                       containerStyle={styles.formContainerStyle}
                />

                <Input label={"Location"}
                       placeholder='Buenos Aires, Argentina'
                       autoFocus={true}
                       containerStyle={styles.formContainerStyle}
                />

                <Button title="Create Project"
                        buttonStyle={styles.button}
                        titleStyle={
                            {
                                fontSize: 20
                            }
                        }
                        onPress={newProject}
                />
        </KeyboardAvoidingView>
    )
}
export default NewProjectForm