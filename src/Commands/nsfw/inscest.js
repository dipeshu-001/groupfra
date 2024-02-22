const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'incest',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'its ab aunt. Your aunt',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.incest();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
