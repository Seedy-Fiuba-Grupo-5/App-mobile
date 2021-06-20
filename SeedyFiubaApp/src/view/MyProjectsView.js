import React, {useContext} from "react";
import {Text} from "react-native";
import SeedyFiubaButton from "./component/SeedyFiubaButton";
import AuthContext from "./component/AuthContext";

const MyProjectsView = () => {
    const {signOut} = useContext(AuthContext);
    return(
        <>
            <Text>Aca Tenemos que tenes otra llamada a la Api</Text>
            <SeedyFiubaButton title={'Sign Out'} onPress={signOut}/>
        </>
    )
}
export default MyProjectsView