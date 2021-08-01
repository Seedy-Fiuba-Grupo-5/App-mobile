import styles from "../Styles/StyleSheet";
import {Button} from "react-native-elements";
import React from "react";

const SeedyFiubaButton = ({title,onPress,style,titleStyle,icon,disable}) => {
    return (
        <Button title={title}
                disabled={disable}
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