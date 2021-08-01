class Creator{
    constructor(info=[]) {
        if (info.length === 0) {
            this.firstName='';
            this.lastName='';
            this.email='';
            this.id='';
            this.address='';
            this.privateKey='';
            this.balance = '';
        }else {
            this.firstName=info.name;
            this.lastName=info.lastName;
            this.email=info.email;
            this.id=info.id;
            this.address=info.address;
            this.privateKey=info.privateKey;
            this.balance = info.balance;
        }
    }
}

export default Creator