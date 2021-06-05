import loginStyle from "../Styles/AuthStyleSheet";
import {Button} from "react-native-elements";
import React from "react";

const AuthButton = ({title,onPress,style}) => {
    return (
        <Button title={title}
                buttonStyle={style}
                titleStyle={
                    {
                        fontSize: 20
                    }
                }
                onPress={onPress}
        />
    )

}
export default AuthButton