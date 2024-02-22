const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'hmanga',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'its a manga.',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.manga();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
