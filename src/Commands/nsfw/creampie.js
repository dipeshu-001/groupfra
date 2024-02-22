const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'creampie',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Who wants to get creampie by daddy?',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.creampie();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
