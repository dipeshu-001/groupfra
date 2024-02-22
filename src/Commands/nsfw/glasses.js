const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'glasses',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Sex with glasses garl?',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.glasses();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
