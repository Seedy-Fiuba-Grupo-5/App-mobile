import React from 'react';
import 'react-native-gesture-handler';
import EditProjectForm from "../component/EditProjectForm";

const EditProjectScreen = ({route}) => {
    return(
        <>
            <EditProjectForm
                project={route.params.project}/>
        </>
    )
}
export default EditProjectScreen;
