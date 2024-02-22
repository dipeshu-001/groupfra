const maker = require("mumaker")
module.exports = {
    name: '3dspace',
    aliases: ['3dsp'],
    category: 'logo maker',
    exp: 5,
    cool: 10,
    react: "🍁",
    description: "Make text logo.",
    async execute(client, arg, M) {
        let text = arg
        if(!text.includes("|")) return M.reply(`Usage: *${client.prefix}3dspace Ari-Ani | Aku*`);
        teks1 = text.split("|")[0]
        teks2 = text.split("|")[1]
        maker.textpro("https://textpro.me/create-space-3d-text-effect-online-985.html", [
            `${teks1}`,`${teks2}`]).then((data) => client.sendMessage(M.from, { image: { url: data }, caption: `Here you go` }, { quoted: M }))
            .catch(
                (err) =>
                client.sendMessage(M.from , 
                    {image: 
                        {
                            url: `${client.utils.errorChan()}`
                        } , 
                        caption: `${client.utils.greetings()} Error-Chan Dis\n\nError:\n${err}`}
                        )
                        )
    }
}
