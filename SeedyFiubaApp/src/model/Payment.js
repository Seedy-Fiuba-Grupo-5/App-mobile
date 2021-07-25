import {isNaN} from "formik";

class Payment{
    constructor(payment=[]) {
        this.stagesCost = [];
        this.balance = 0;
        this.state = '';
        this.stagesStates = [];
        if (payment.length !== 0) {
            this.stagesCost = payment.stagesCost;
            let fBalance = parseFloat(payment.balance);
            this.balance = isNaN(fBalance) ? 0 : fBalance.toFixed(4);
            this.state = payment.state;
            this.stagesStates = payment.stagesStates;
        }
    }
}
export default Payment