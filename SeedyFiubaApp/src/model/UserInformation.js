import AsyncStorage from '@react-native-async-storage/async-storage';

class UserInformation{

    static async setToken(json){
        const empty = [undefined, null, ""];
        let newToken = json.token;
        if (!empty.includes(newToken)) {
            UserInformation.setData('userToken',newToken).then();
        }
    }

    static async setData(key,value){
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    }

    static async setData2(id,jwt){
        try {
            let userId = JSON.stringify(id);
            let token = JSON.stringify(jwt);
            await AsyncStorage.setItem('userId', userId);
            await AsyncStorage.setItem('userToken', token);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
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
        return null;
    }

    static async getData2(){
        try {
            let id = await AsyncStorage.getItem('userId');
            let jwt = await AsyncStorage.getItem('userToken');
            console.log(id);
            console.log(jwt);
            return {
                id:JSON.parse(id),
                jwt:JSON.parse(jwt),
            }
        } catch(e) {
            console.log(e);
            return {
                id:null,
                jwt:null,
            }
        }
    }

    static async removeData() {
        try {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userToken');
            return true;
        }
        catch(e) {
            console.log(e);
            return false;
        }
    }
}

export default UserInformation