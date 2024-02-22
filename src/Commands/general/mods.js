module.exports = {
  name: 'mods',
  aliases: ['mod'],
  category: 'general',
  exp: 0,
  react: "✅",
  description: 'Get information bot information',
  async execute(client, arg, M) {

      let mods = client.mods
      let mo=`*Ari-Ani MODS*\n`
      for(let i=0;i<mods.length;i++){
        let hmm = mods[i]
          const um= (await client.contact.getContact(hmm, client)).username;
          mo+=`\n#${i+1}\n*Contact:* http://wa.me/+${mods[i]}\n`
      }
      M.reply(mo)
  }
}
