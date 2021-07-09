import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInformation{
    static async setData(key,value){
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    }

    static async getData(key){
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue != null){
            const user = JSON.parse(jsonValue);
            return {
                id:user.id,
                jwt:user.jwt
            }
        }
        return null
    }
}

export default UserInformation