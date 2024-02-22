const axios  = require("axios")
module.exports = {
    name: 'couplepp',
    // aliases: ['coffee'],
    category: 'weeb',
    exp: 10,
    cool: 10,
    react: "✅",
    description: 'Sends an image of random anime couple?',
    async execute(client, arg, M) {

        let {data} = await axios.get("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json")
        let akusingle = data[Math.floor(Math.random() * data.length)]
        await client.sendMessage(M.from,{image:{url:akusingle.female}, caption: "*For Him*" },{quoted:M})
        await client.sendMessage(M.from,{image:{url:akusingle.male}, caption: "*For Her*" },{quoted:M})
    }
}
