import React from "react";
import {Avatar} from "react-native-elements";
const AccountAvatar = ({name}) => {
    const avatarTitle= (name)=> {
        let names = name.split(" ");
        let title = '';
        names.forEach((value)=>
        {
            title=title+value.charAt(0);
        })
        return title;
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