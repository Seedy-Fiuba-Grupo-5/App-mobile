import React from "react";
import {Avatar} from "react-native-elements";
const AccountAvatar = ({name}) => {
    const avatarTitle= (name)=> {
        const title = name.firstName.charAt(0)+name.lastName.charAt(0);
        return title.toUpperCase();
    }
    return (
        <Avatar
            size="xlarge"
            rounded
            title={avatarTitle(name)}
            containerStyle={{marginTop:30, backgroundColor:'grey'}}
        />
    )
}
export default AccountAvatar;