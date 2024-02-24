module.exports = {
    name: 'join',
    aliases: ['add'],
    category: 'dev',
    cool: 60,
    exp: 0,
    react: "✅",
    description: 'Bot joins the group using the link',
    async execute(client, arg, M) {
       try{

        if (!arg) return M.reply('Aap ne koi group link nhi diya!')
        if (!arg.includes('whatsapp.com')) return M.reply('Aap ne koi sai group link nhi diya!')
        const JoinCode = arg.split('https://chat.whatsapp.com/')[1]
        client
            .groupAcceptInvite(JoinCode)
            .then((res) => M.reply('Joined'))
            .catch((res) => M.reply('Group link ma koi kharabi h'))

       }catch(err){
      await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
    }
    }
}
