
class Transactions {
    constructor(transactions) {
        this.allTransactions = [];
        transactions.map((transaction) => {
            this.allTransactions.push({
                id: transaction.id,
                amountEthers: transaction.amountEthers,
                toPublicId: transaction.toPublicId,
                toType: transaction.project,
                transactionType: transaction.transactionType,
                transactionState: transaction.transactionState,
                updatedAt: transaction.updatedAt
            });
        })
    }
}

export default Transactions