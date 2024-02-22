const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'femdom',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'femdom rule!',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.femdom();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
