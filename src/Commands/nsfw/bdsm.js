const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'bdsm',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Does it need description? UwU',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.bdsm();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
