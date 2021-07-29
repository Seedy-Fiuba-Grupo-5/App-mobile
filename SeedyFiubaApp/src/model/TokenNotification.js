import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

class TokenNotification {
    static async getToken() {
        if (Constants.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                return 'IGNOREXPO';
            }
            return (await Notifications.getExpoPushTokenAsync()).data;
        }
        return 'IGNOREXPO'
    }

}
export default TokenNotification