class Projects {
    constructor(projects) {
        this.allProjects = [];
        projects.map((project) => {
            this.allProjects.push({id: project.id, name: project.name,
                description: project.description,
                hashtags: project.hashtags,
                goal: project.goal,
                endDate: project.endDate,
                location: project.location,});
        })
    }
}
export default Projects