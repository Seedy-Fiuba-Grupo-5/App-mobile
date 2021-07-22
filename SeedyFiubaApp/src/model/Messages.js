
class Messages {
    constructor(messages) {
        this.allMessages = [];
        messages.map((message) => {
            console.log(message);
            this.allMessages.push({
                id_2: message.id_2,
                id_1: message.id_1,
                text: message.text,
                date: message.date
            });
        })
    }
}

export default Messages