const yts = require('yt-search')

module.exports = {
    name: 'ytsearch',
    aliases: ['yts'],
    category: 'media',
    exp: 5,
    description: 'Searches the video of the given query in YouTube',
    async execute(client, arg, M) {
       try{
        if (!arg) return M.reply('Sorry you did not give any search term!')
        const { videos } = await yts(arg.trim())
        if (!videos || !videos.length) return M.reply(`No videos found | *"${query}"*`)
        let text = ''
        const length = videos.length >= 10 ? 10 : videos.length
        for (let i = 0; i < length; i++) {
            text += `*#${i + 1}*\n🎵 *Title: ${videos[i].title}*\n🎤 *Channel: ${
                videos[i].author.name
            }*\n⏱️ *Duration: ${videos[i].seconds}s*\n👁️ Views: ${videos[1].views}\n🔗 *URL: ${videos[i].url}*\n\n`
        }
        M.reply(text)
       }//Our beloved error chan. No one can stop her!
    catch(err){
        await client.sendMessage(M.from , {image: {url: `${client.utils.errorChan()}`} , caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`})
      }
    }
}