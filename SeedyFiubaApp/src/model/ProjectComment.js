class ProjectComment {
    constructor(comment=[]) {
        this.text = '';
        this.date = '';
        if (comment.length !== 0) {
            this.text = comment.text;
            this.date = comment.date;
        }
    }
}
export default ProjectComment