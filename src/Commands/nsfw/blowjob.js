const axios = require("axios");
const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'blowjob',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Its a good job for your step mom',
    async execute(client, arg, M) {
        if(arg === '2') {
            
        let waifud = await hmtai.nsfw.cuckold();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }


        let assss = await axios.get ("https://purrbot.site/api/img/nsfw/blowjob/gif")
        var bobuff = await client.utils.getBuffer(assss.data.link)
        var bogif = await client.utils.gifToMp4(bobuff)
        await client.sendMessage(M.from,{video:bogif, gifPlayback:true },{quoted:M}).catch(err => {
            client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
        })
    }
}
