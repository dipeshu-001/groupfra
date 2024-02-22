const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'ass',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'If u dont know what it is then bro study',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.ass();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
