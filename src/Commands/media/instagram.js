const axios = require('axios');

module.exports = {
    name: 'insta',
    aliases: ['instagram'],
    category: 'media',
    exp: 5,
    description: 'Downloads given Instagram Video and sends it',
    async execute(client, arg, M) {
        try {
            if (!arg.length) return await M.reply('❌ Please provide an Instagram URL');
            
            const url = arg;
            
            if (
                !(
                    url.includes('instagram.com/p/') ||
                    url.includes('instagram.com/reel/') ||
                    url.includes('instagram.com/tv/')
                )
            )
                return await M.reply('❌ Wrong URL! Only Instagram posted videos, TV, and reels can be downloaded');

            const response = await axios.get(`https://weeb-api.vercel.app/insta?url=${url}`);
            

            // if (!data.urls || !data.urls.length) {
            //     return await M.reply('❌ No video found for the provided URL');
            // }
        var bobuff = await client.utils.getBuffer(response.urls[0].url)
        // var bogif = await client.utils.gifToMp4(bobuff)

            const videoUrl = data.urls[0].url;

            // Now you can use the videoUrl as needed, for example sending it as a message
            await client.sendMessage(
                M.from,
                {
                  video: bobuff,
                  caption: data.caption,
                  gifPlayback: true
                },
                {
                  quoted: M
                }
                );
        } catch (error) {
            console.error('Error fetching and sending Instagram video:', error);
            await M.reply('❌ Error while getting video data');
        }
    }
};
