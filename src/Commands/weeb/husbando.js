const axios  = require("axios")
module.exports = {
    name: 'husbando',
    // aliases: ['coffee'],
    category: 'weeb',
    exp: 10,
    cool: 10,
    react: "✅",
    description: 'Sends an image of random boys for girls and gays only',
    async execute(client, arg, M) {

        let waifud = await axios.get('https://nekos.best/api/v2/husbando')
        await client.sendMessage(M.from,{image:{url:waifud.data.results[0].url}},{quoted:M})
 
    }
}
