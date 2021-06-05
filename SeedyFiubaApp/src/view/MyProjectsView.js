import React, {useContext} from "react";
import {Text} from "react-native";
import AuthButton from "./component/AuthButton";
import AuthContext from "./component/AuthContext";

const MyProjectsView = () => {
    const {signOut} = useContext(AuthContext);
    return(
        <>
            <Text>Aca Tenemos que tenes otra llamada a la Api</Text>
            <AuthButton title={'Sign Out'} onPress={signOut}/>
        </>
    )
}
export default MyProjectsView