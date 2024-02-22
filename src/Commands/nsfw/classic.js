const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'classic',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Be classic even in sex',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.classic();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
