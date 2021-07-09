import {Button, Text, View} from "react-native";
import React, {useState} from "react";
import {Icon, Overlay} from "react-native-elements";

const ProjectNameEditable = ({name,isEditable}) => {
    const [projectName, setProjectName] = useState(name);
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white'};
    if (isEditable) {
        return (<>
            <Overlay isVisible={visible} onBackdropPress={hideModal} style={{width:200}}>
                <Text>Hello from Overlay!</Text>
            </Overlay>
                <View style={{flexDirection: "row"}}>
                    <Text style={{fontSize: 30}}>{projectName}</Text>
                    <Icon
                        containerStyle={{paddingTop: 4, paddingLeft: 2}}
                        name='edit'
                        type='material'
                        size={30}
                        onPress={()=>{
                            showModal();
                        }}/>
                </View>
        </>

        )
    } else {
        return(
            <Text style={{fontSize: 30}}>{projectName}</Text>
        )
    }
}
export default ProjectNameEditable