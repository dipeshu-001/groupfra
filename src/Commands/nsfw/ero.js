const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'ero',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'i can feel something small becoming big',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.anal();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
