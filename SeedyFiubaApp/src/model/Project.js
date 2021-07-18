import Creator from "./Creator";

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
        }
    }
}
export default Project