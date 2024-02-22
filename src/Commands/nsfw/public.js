const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'public',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Nothing beat sex in public',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.public();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
