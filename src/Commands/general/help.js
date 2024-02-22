const fs = require("fs")

module.exports = {
name: 'help',
aliases: ['h', 'menu', 'list'],
category: 'general',
exp: 10,
cool: 30,
react: "✅",
description: 'Displays the command list or specific command info',
async execute(client, arg, M) {

  try{

    if (!arg) {
    
      let pushName = M.pushName.trim();
  
      if (pushName.split(' ').length === 1) {
        pushName = `${pushName} san`;
      }
      
      const categories = client.cmd.reduce((obj, cmd) => {
        const category = cmd.category || 'Uncategorized'
        obj[category] = obj[category] || []
        obj[category].push(cmd.name)
        return obj
      }, {})
      
      const emojis = ['🃏', '👨‍💻', '📈', '🍁', '🍀' , '🎨', '🎵', '♨️', '🎐' , '🔞' , '🎮', '🔧', '⛩️']
      
      const commandList = Object.keys(categories)
      
      let commands = ''
      
      for (const category of commandList) {
        commands += `*${client.utils.capitalize(
          category,
          true
          )}* ${emojis[commandList.indexOf(category)]} :-  \n\`\`\`${categories[category].map((cmd) => 
            `${cmd}`).join(', ')}\`\`\`\n\n`
        
        }

        // commands += `\n${emojis[commandList.indexOf(category)]} *${client.utils.capitalize(
        //   category,
        //   true
        //   )}*\n\n${categories[category].map((cmd) => `${client.prefix}${cmd}`).join(', ')}\`\`\`\n\n`
  
        
        let message = `*${client.utils.greetings()}* ${pushName}.Watashiwa ${client.utils.capitalize(client.name)} tomōshimasu\n\n🧧 Prefix : [ ${client.prefix} ]\n\n💡 *Tips:*\n\n→ *Script:* This private script is available for sale. Contact me at 923087880256 for more information.\n→ Type *${client.prefix}help* <Command-Name> to see command description and usage.📝 Here's the Commands listed below:\n\n${commands}`
        message += `🗃️ Thanks for using ${client.utils.capitalize(client.name)}. If you find me helpful, please share me with your friends and leave a review! 🌟`
        const buffer = await client.utils.getBuffer('https://i.imgur.com/ZgrSw7W.jpg')
        
        await client.sendMessage(
          M.from,
          {
            video: fs.readFileSync("assets/37c1005f140bf1a2db03d.mp4"),
            caption: message,
            gifPlayback: true
          },
          {
            quoted: M
          }
          )
          return
        }
        
        const command = client.cmd.get(arg) || client.cmd.find((cmd) => cmd.aliases && cmd.aliases.includes(arg));
        
        if (!command) {
          return M.reply('Command not found');
        }

        const aliases = command.aliases ? command.aliases.join(', ') : 'No Aliases';
        const cooldown = command.cool ? command.cool : 'No cooldown';
        const description = command.description ? command.description : 'No Description'

        const message = `🎐 Command: ${command.name}\n🎴 Aliases: ${aliases}\n🔗 Category: ${command.category}\n⏰ Cooldown: ${cooldown}\n🎗 Desc: ${description}`;

        M.reply(message);

  }catch(err){
    await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
  }
          
    }
}
