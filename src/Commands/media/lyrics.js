





const YT = require('../../lib/YT')
const yts = require('yt-search')

module.exports = {
    name: 'hmm',
    aliases: ['hmmmm'],
    category: 'media',
    exp: 5,
    description: 'Downloads given YT Video and sends it as Audio',
    async execute(client, arg, M) {
        if (!text) return void (await M.reply('❌ Please provide a search term'))
        const data = await client.util.fetch(`https://some-random-api.com/others/lyrics?title=${text}`)
        if (data.error) return void (await M.reply("❌ Couldn't find any lyrics"))

        return void (await M.replyRaw({
            text: `🎊 *Title: ${data.title}*\n🖋️ *Artist: ${data.author}*\n\n ${data.lyrics}`,
            contextInfo: {
                externalAdReply: {
                    title: data.title,
                    body: '',
                    thumbnail: await client.util.getBuffer(data.thumbnail.genius),
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: '',
                    ShowAdAttribution: true
                }
            }
        }))
    }
}