import styles from "../Styles/StyleSheet";
import {Button} from "react-native-elements";
import React from "react";

const SeedyFiubaButton = ({title,onPress}) => {
    return (
        <Button title={title}
                buttonStyle={styles.button}
                titleStyle={
                    {
                        fontSize: 20
                    }
                }
                onPress={onPress}
        />
    )

}
export default SeedyFiubaButton