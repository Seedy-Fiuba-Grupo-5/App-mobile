import ProjectComment from "./ProjectComment";

class Comments {
    constructor(comments) {
        this.allComments = [];
        comments[0].map((comment) => {
            this.allComments.push(new ProjectComment(comment));
        })
    }
}
export  default Comments