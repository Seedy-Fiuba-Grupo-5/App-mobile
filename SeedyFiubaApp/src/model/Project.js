import Creator from "./Creator";
import Payment from "./Payment";

class Project{
    constructor(project=[]) {
        if (project.length === 0) {
            this.id = '';
            this.name = '';
            this.description = '';
            this.type= '';
            this.hashtags = '';
            this.goal = '';
            this.endDate = '';
            this.location = '';
            this.image = '';
            this.video = '';
            this.user = new Creator();
            this.payments = new Payment();
            this.createdOn='';
        }else {
            this.id = project.id;
            this.name = project.name;
            this.description = project.description;
            this.type= project.type;
            this.hashtags = project.hashtags;
            this.goal = project.goal;
            this.endDate = project.endDate;
            this.location = project.location;
            this.image = project.image;
            this.video = project.video;
            this.user = new Creator(project.user);
            this.payments = new Payment(project.payments);
            this.createdOn = project.createdOn;
        }
    }
}
export default Project