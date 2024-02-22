const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'cuckold',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'IDK',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.cuckold();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
