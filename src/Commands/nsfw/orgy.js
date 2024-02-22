const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'orgy',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'its orgy bitch',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.orgy();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
