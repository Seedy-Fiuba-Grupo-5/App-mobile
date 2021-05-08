import {Button, Input} from "react-native-elements";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {URL_LOCAL} from '@env'

const NewProjectView = () => {
    const [name, setName] = useState("");
    const newProject = () =>{
        if(name!==""){
            axios.post(URL_LOCAL+'/projects',{'name': name});
        }
    }
    return (
        <>
            <Input placeholder="NewProyect"
                       onChangeText={newName => setName(newName)}/>
            <Button title="Submit" onPress={newProject}/>
        </>
    )
}
export default NewProjectView