import axios from 'axios';
import {URL_LOCAL_USER} from '@env'
import User from "./User";

class ApiUser {
    static BASE_URL = URL_LOCAL_USER;
    constructor() {
    }
    static async register(firsName, lastName, email, password) {
        const url = ApiUser.BASE_URL + '/users';
        const response = await axios.post(url,{
            name : firsName,
            lastName : lastName,
            email : email,
            password : password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }
    static async login(email,password) {
        const url = ApiUser.BASE_URL + '/users/login';
        const response = await axios.post(url, {
            email:email,
            password:password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async user(id) {
        const url = ApiUser.BASE_URL + '/users/'+id;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async updateUser(id,firstName,lastName,email) {
        const url = ApiUser.BASE_URL + '/users/'+id;
        const response = await axios.patch(url,{
            name:firstName,
            lastName:lastName,
            email:email
        });
        const jsonData = response.data;
        return new User(jsonData);
    }
}
export default ApiUser