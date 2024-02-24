module.exports = {
    name: 'leave',
    aliases: ['bye'],
    category: 'dev',
    exp: 0,
    react: "✅",
    description: 'Bot leaves the group',
    async execute(client, arg, M) {
        client.groupLeave(M.from).catch((res) => M.reply('Group ke link ma koi kharabi hn'))
    }
}
//M.quoted.mtype === 'imageMessage',
