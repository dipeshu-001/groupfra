const axios = require('axios')

module.exports = {
    name: 'fact',
    category: 'fun',
    exp: 5,
    cool: 10,
    react: "✅",
    description: 'Sends random facts',
    async execute(client, arg, M) {
        await axios
            .get(`https://nekos.life/api/v2/fact`)
            .then((response) => {
                const text = `Fact for you: ${response.data.fact}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`🔍 Error: ${err}`)
            })
    }
}
