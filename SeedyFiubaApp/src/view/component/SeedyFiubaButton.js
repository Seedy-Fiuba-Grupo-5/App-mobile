import loginStyle from "../Styles/AuthStyleSheet";
import {Button} from "react-native-elements";
import React from "react";

const SeedyFiubaButton = ({title,onPress,style,titleStyle,icon}) => {
    return (
        <Button title={title}
                icon={icon}
                buttonStyle={style}
                titleStyle={[{
                    fontSize: 20
                },titleStyle]
                }
                onPress={onPress}
        />
    )

}

export default SeedyFiubaButton