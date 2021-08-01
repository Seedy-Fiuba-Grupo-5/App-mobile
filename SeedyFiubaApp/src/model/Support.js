
class Support {
    constructor(found=[]) {
        if (found.length === 0) {
            this.id = 0;
            this.amountEthers = '';
            this.fromPublicId = '';
            this.fromType = '';
            this.toPublicId = '';
            this.toType = '';
            this.transactionType = '';
            this.transationState = '';
            this.token = '';
        }else {
            this.id = found.id;
            this.amountEthers = found.amountEthers;
            this.fromPublicId = found.fromPublicId;
            this.fromType = found.fromType;
            this.toPublicId = found.toPublicId;
            this.toType = found.toType;
            this.transactionType = found.transactionType;
            this.transationState = found.transationState;
            this.token = found.token;
        }
    }
}
export default Support