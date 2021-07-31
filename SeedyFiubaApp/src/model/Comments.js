import ProjectComment from "./ProjectComment";

class Comments {
    constructor(comments) {
        this.allComments = [];
        if (comments.length > 0){
            comments[0].map((comment) => {
                this.allComments.push(new ProjectComment(comment));
            })
        }
    }
}
export  default Comments