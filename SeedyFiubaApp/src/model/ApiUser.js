import axios from 'axios';
import {URL_LOCAL_GATEWAY} from '@env'
import User from "./User";
import Project from "./Project";
import Projects from "./Projects";
import Creator from "./Creator";
import Seer from "./Seer";
import Messages from "./Messages";
import Transactions from "./Transactions";

class ApiUser {

    static async createProject(user_id,project) {
        const url = URL_LOCAL_GATEWAY + '/users/' + user_id +'/projects';
        const response = await axios.post(url, project);
        const jsonData = response.data;
        return new Project(jsonData);
    }


    static async register(firsName, lastName, email, password,expoToken) {
        const url = URL_LOCAL_GATEWAY + '/users';
        const response = await axios.post(url,{
            name : firsName,
            lastName : lastName,
            email : email,
            password : password,
            expo_token:expoToken
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async projects(user_id) {
        const url = URL_LOCAL_GATEWAY  + '/users/' + user_id +'/projects';
        const response = await axios.get(url);
        const jsonData = response.data;
        return new Projects(jsonData);
    }

    static async login(email,password,expoToken) {
        const url = URL_LOCAL_GATEWAY + '/users/login';
        const response = await axios.post(url, {
            email:email,
            password:password,
            expo_token:expoToken
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async user(id,token) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id;
        const response = await axios.get(url, {params:{token:token}});
        const jsonData = response.data;
        return new Creator(jsonData);
    }

    static async updateUser(id,token,firstName,lastName,email) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id;
        const response = await axios.patch(url,{
            name:firstName,
            lastName:lastName,
            email:email,
            token:token
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async logout(id,token) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id;
        const response = await axios.patch(url,{
            expo_token:'IGNOREXPO',
            token:token
        });
        const jsonData = response.data;
        return new User(jsonData);
    }

    static async seer(id) {
        const url = URL_LOCAL_GATEWAY + '/seers/'+id;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new Seer(jsonData);
    }

    static async acceptSeer(id,token, projectId) {
        const url = URL_LOCAL_GATEWAY + '/seers/'+id;
        const response = await axios.patch(url,{
            token: token,
            project_id:projectId,
            accepted:true
        });
        const jsonData = response.data;
        return new Seer(jsonData);
    }

    static async denySeer(id,token, projectId) {
        const url = URL_LOCAL_GATEWAY + '/seers/'+id;
        const response = await axios.delete(url,{ data:
                {
                    token: token,
                    project_id:projectId}
        });
        const jsonData = response.data;
        return new Seer(jsonData);
    }

    static async inviteSeer(projectId,id,token) {
        const url = URL_LOCAL_GATEWAY + '/seers/'+id;
        const response = await axios.post(url, {token:token, project_id:projectId});
        const jsonData = response.data;
        return new Seer(jsonData);
    }

    static async addProjectToFavorites(projectId, id, token) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id+'/favorites';
        const response = await axios.post(url, {token:token, project_id:projectId});
        //Falta ver bien que hacer con el valor de retorno.
        return response.status;
    }

    static async removeProjectFromFavorites(projectId, id, token) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id+'/favorites';
        const response = await axios.delete(url, {data: {token:token, project_id:projectId}});
        //Falta ver bien que hacer con el valor de retorno.
        return response.status;
    }

    static async favoriteProjects(id) {
        const url = URL_LOCAL_GATEWAY + '/users/'+id+'/favorites';
        const response = await axios.get(url);
        return new Projects(response.data);
    }

    static async sendMessage(id, token, message, receiverId) {
        const url = URL_LOCAL_GATEWAY + '/messages/'+receiverId;
        const response = await axios.post(url, {token:token , id_1:id, message: message});
        return response.status;
    }

    static async getMessages(id, token) {
        const url = URL_LOCAL_GATEWAY + '/messages/'+id+"?token="+token;
        const response = await axios.get(url);
        if(response.data.length > 0){
            return new Messages(response.data[0]);
        }
        return {allMessages:[]};
    }

    static async getTransactions(id) {
        const url = URL_LOCAL_GATEWAY + '/transactions?fromType=user&fromPublicId='+id;
        const response = await axios.get(url);
        if(response.data.length > 0){
            return new Transactions(response.data);
        }
        return {allTransactions:[]};
    }
}
export default ApiUser