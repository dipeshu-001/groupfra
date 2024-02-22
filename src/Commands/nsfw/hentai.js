const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'hentai',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Does it need description?',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.hentai();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
