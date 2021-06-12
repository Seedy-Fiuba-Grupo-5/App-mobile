import React, {useCallback, useContext} from "react";
import AuthContext from "./AuthContext";

const UseAuth = () => {
    const {jwt,setJWT} = useContext(AuthContext);
    const signIn = useCallback((newJWT) => {
        setJWT(newJWT);
    },[])
    const signOut = useCallback(() => {
        setJWT(null);
    },[])
    const signUp = useCallback((newJWT) => {
        setJWT(newJWT);
    },[])
    return {jwt,signIn,signOut,signUp}
}

export default UseAuth