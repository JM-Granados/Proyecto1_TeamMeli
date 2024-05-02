class Message {
    constructor(userSender, userRecipient, text, file) {
        this.userSender = userSender;
        this.userRecipient = userRecipient;
        this.text = text;
        this.file = file;
        this.createdAt = new Date();
    }
}

class Notification {
    constructor(user, text) {
        this.user = user;
        this.text = text;
        this.createdAt = new Date();
    }
}

module.exports = {Message, Notification};