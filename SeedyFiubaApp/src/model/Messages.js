
class Messages {
    constructor(messages) {
        this.allMessages = [];
        let counter = 0
        messages.map((message) => {
            this.allMessages.push({
                id: counter,
                email: message.email,
                id_1: message.id_1,
                id_2: message.id_2,
                text: message.text,
                date: message.date
            });
            counter++;
        })
    }
}

export default Messages