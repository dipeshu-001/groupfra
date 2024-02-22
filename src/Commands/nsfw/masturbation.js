const HMtai = require("hmtai");
const hmtai = new HMtai();
module.exports = {
    name: 'masturbation',
    category: 'nsfw',
    exp: 10,
    cool: 15,
    react: "✅",
    description: 'Wanna see your step sis masturbating?',
    async execute(client, arg, M) {
        let waifud = await hmtai.nsfw.masturbation();
        await client.sendMessage(M.from,{image:{url:waifud}},{quoted:M})
    }
}
