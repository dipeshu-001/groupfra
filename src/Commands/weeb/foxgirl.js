const HMtai = require("hmtai");
const hmtai = new HMtai();

module.exports = {
    name: 'foxgirl',
    // aliases: ['coffee'],
    category: 'weeb',
    exp: 10,
    cool: 10,
    react: "✅",
    description: 'Sends an image of random fox girl',
    async execute(client, arg, M) {
        let waifud = await hmtai.sfw.wolf_arts();
        await client.sendMessage(M.from,{image:{url:waifud}, caption: "*_awooo_ ~*"},{quoted:M})
 
 
    }
}
