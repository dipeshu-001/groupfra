const axios = require("axios")
module.exports = {
    name: 'threesome_fff',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: '3 females mastubating!',
    async execute(client, arg, M) {
        let assss = await axios.get ("https://purrbot.site/api/img/nsfw/threesome_fff/gif")
        var bobuff = await client.utils.getBuffer(assss.data.link)
        var bogif = await client.utils.gifToMp4(bobuff)
        await client.sendMessage(M.from,{video:bogif, gifPlayback:true , caption: `_Neko Neko Ni~_`},{quoted:M}).catch(err => {
            client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
        })
    }
}
