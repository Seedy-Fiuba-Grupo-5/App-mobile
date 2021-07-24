import {isNaN} from "formik";

class Payment{
    constructor(payment=[]) {
        this.stagesCost = [];
        this.balance = 0;
        this.state = '';
        if (payment.length !== 0) {
            this.stagesCost = payment.stagesCost;
            let fBalance = parseFloat(payment.balance);
            this.balance = isNaN(fBalance) ? 0 : fBalance.toFixed(2);
            this.state = payment.state;
        }
    }
}
export default Payment