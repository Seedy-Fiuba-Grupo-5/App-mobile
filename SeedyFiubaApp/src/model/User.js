class User{
    constructor(info=[]) {
        if (info.length === 0) {
            this.firstName='';
            this.lastName='';
            this.email='';
            this.id='';
        }else {
            this.firstName=info.name;
            this.lastName=info.lastName;
            this.email=info.email;
            this.id=info.id;
        }
    }
}
export default User