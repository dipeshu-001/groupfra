const axios = require('axios')

module.exports = {
    name: 'advice',
    aliases: ['adv'],
    category: 'fun',
    exp: 5,
    cool: 10,
    react: "✅",
    description: 'Sends random advices',
    async execute(client, arg, M) {
        
        await axios
        
        .get(`https://api.adviceslip.com/advice`)
        
        .then((response) => {
            
            const text = `Advice for you: ${response.data.slip.advice}`
            
            M.reply(text)
        }).catch((err) => {
             client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
        })
    }
}
