import Creator from "./Creator";

class Payment{
    constructor(payment=[]) {
        this.stagesCost = [];
        if (payment.length !== 0) {
            this.stagesCost = payment.stagesCost;
        }
    }
}
export default Payment