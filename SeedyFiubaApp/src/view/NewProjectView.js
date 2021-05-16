import {Button, Input} from "react-native-elements";
import React, {useState} from "react";
import {ToastAndroid} from "react-native";
import ApiProject from "../model/ApiProject";

const NewProjectView = () => {
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
    return (
        <>
            <Input placeholder="Name"
                   containerStyle={
                       {
                           width: '80%',
                           alignSelf: 'center'
                       }
                   }
                   ref={nameInput}
                   onChangeText={newName => setName(newName)}/>
            <Button title="Create Project"
                    buttonStyle={
                        {
                            backgroundColor: '#3E9677',
                            borderRadius: 15,
                            width: '80%',
                            alignSelf: 'center'
                        }
                    }
                    titleStyle={
                        {
                            fontSize: 20
                        }
                    }
                    onPress={newProject}/>
        </>
    )
}
export default NewProjectView