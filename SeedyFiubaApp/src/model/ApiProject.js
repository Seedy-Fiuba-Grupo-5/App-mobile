import axios from 'axios';
import Projects from "./Projects";
import {URL_LOCAL_GATEWAY} from '@env'
import Project from "./Project";
import Support from "./Support";
import Transactions from "./Transactions";
import Comments from "./Comments";

class ApiProject {

    static async projects(params) {
        const url = URL_LOCAL_GATEWAY + '/projects';
        const response = await axios.get(url,{params:params});
        const jsonData = response.data;
        return new Projects(jsonData);
    }

    static async sendComment(projectId, comment, userId, token) {
        const url = URL_LOCAL_GATEWAY + '/commentary/'+projectId+'?token='+token+'&userId='+userId;
        const response = await axios.post(url,{
            user_id:userId,
            message:comment,
            token:token
        });
        return response.data;
    }

    static async comments(projectId, userId, token) {
        const url = URL_LOCAL_GATEWAY + '/commentary/'+projectId+'?token='+token+'&userId='+userId;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new Comments(jsonData);
    }

    static async project(projectId) {
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId;
        const response = await axios.get(url);
        const jsonData = response.data;
        return new Project(jsonData);
    }

    static async updateProject(projectId,token, project) {
        project.token = token;
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId;
        const response = await axios.patch(url, project);
        const jsonData = response.data;
        return new Project(jsonData);
    }

    static async supportProject(projectId,token,userId,amount) {
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId + '/funds?token='+token;
        const response = await axios.post(url, {
            userPublicId: userId,
            amountEthers: amount
        });
        const jsonData = response.data;
        return new Support(jsonData);
    }

    static async completeStage(projectId,token,userId,stage) {
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId + '/stages?token='+token;
        const response = await axios.post(url, {
            reviewerPublicId: userId,
            stageNumber: stage.toString()
        });
        const jsonData = response.data;
        return new Support(jsonData);
    }

    static async rateProject(userId, projectId,rating) {
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId + '/rate';
        const response = await axios.post(url, {
            id_user: userId,
            rating: rating
        });
        return response.data;
    }

    static async getRating(userId, projectId) {
        const url = URL_LOCAL_GATEWAY + '/projects/' + projectId + '/rate?id_user='+userId;
        const response = await axios.get(url);
        return response.data;
    }

    static async getTransactions(id) {
        const url = URL_LOCAL_GATEWAY + '/transactions?toType=project&toPublicId='+id;
        const response = await axios.get(url);
        if(response.data.length > 0){
            return new Transactions(response.data);
        }
        return {allTransactions:[]};
    }

}
export default ApiProject