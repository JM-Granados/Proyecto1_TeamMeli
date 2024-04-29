class Message {
    constructor(userSender, userRecipient, text, file) {
        this.userSender = userSender;
        this.userRecipient = userRecipient;
        this.text = text;
        this.file = file;
        this.createdAt = new Date();
    }
}

module.exports = Message;