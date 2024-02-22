const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'pantsu',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'ara',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.pantsu();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
