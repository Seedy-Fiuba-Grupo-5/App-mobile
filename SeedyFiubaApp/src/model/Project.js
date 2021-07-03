class Project{
    constructor(project) {
        this.id = project.id;
        this.name = project.name;
        this.description = project.description;
        this.type= project.type;
        this.hashtags = project.hashtags;
        this.goal = project.goal;
        this.endDate = project.endDate;
        this.location = project.location;
        this.image = project.image;
    }
}
export default Project