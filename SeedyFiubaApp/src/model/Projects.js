class Projects {
    constructor(projects) {
        this.allProjects = [];
        projects.map((project) => {
            this.allProjects.push({id: project.id, name: project.name});
        })
    }
}
export default Projects