module.exports = {
    name: 'report',
    aliases: ['reports'],
    category: 'general',
    exp: 5,
    cool: 30,
    react: "✅",
    description: 'Report bug or something to devs',
    async execute(client, arg, M) {
        if (!arg) return M.reply('Write the message, Baka!')
        await client.sendMessage(M.from, {text: `Report won't work in beta version`} , {quoted: M})
    }
}
