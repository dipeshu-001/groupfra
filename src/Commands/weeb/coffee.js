const HMtai = require("hmtai");
const hmtai = new HMtai();

module.exports = {
    name: 'coffee',
    // aliases: [''],
    category: 'weeb',
    exp: 10,
    cool: 10,
    react: "✅",
    description: 'sends a coffee with a girl xd',
    async execute(client, arg, M) {
        let coffeeGirl = await hmtai.sfw.coffee_arts();
        await client.sendMessage(M.from,{image:{url:coffeeGirl} , caption: `Do you want some coffee? And girls :3`},{quoted:M})
 
    }
}
