class User{
    constructor(info=[]) {
        this.firstName=info.name;
        this.lastName=info.lastName;
        this.email=info.email;
        this.id=info.id;
    }
}
export default User