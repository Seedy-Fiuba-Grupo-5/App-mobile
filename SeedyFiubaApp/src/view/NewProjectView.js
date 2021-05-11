import {Button, Input} from "react-native-elements";
import React, {useState} from "react";
import axios from "axios";
import {URL_LOCAL} from '@env'
import {StyleSheet} from "react-native";
import styles from "./Styles/StyleSheet";

const NewProjectView = () => {
    const [name, setName] = useState("");
    const newProject = () =>{
        if(name !== ""){
            axios.post(URL_LOCAL+'/projects',{'name': name}).catch((error)=>{
                console.log(error);
            });
        }
    }
    return (
        <>
            <Input placeholder="NewProyect"
                       onChangeText={newName => setName(newName)}/>
            <Button title="Submit"
                    style={styles.button}
                    type={"clear"}
                    onPress={newProject}/>
        </>
    )
}

export default NewProjectView