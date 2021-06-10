import axios from 'axios';
import {URL_LOCAL_USER} from '@env'
import User from "./User";

class ApiUser {
    constructor() {
        this.baseUrl = URL_LOCAL_USER;
    }
    async register(firsName, lastName, email, password) {
        const url = this.baseUrl + '/users';
        const response = await axios.post(url,{
            name : firsName,
            lastName : lastName,
            email : email,
            password : password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }
    async login(email,password) {
        const url = this.baseUrl + '/users/login';
        const response = await axios.post(url, {
            email:email,
            password:password
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    async user(id) {
        const url = this.baseUrl + '/users/'+id;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new User(jsonData);
    }

    async updateUser(id,firstName,lastName,email) {
        const url = this.baseUrl + '/users/'+id;
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