module.exports = {
    async makeRandomLink() {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let newLink = ""
        for(let i=0; i<20; i++) {
            newLink += characters.charAt(Math.floor(Math.random() * 36))
        }
        return newLink
    }
}