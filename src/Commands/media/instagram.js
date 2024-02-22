const axios = require('axios');

module.exports = {
    name: 'insta',
    aliases: ['instagram'],
    category: 'media',
    exp: 5,
    description: 'Downloads given Instagram Video and sends it',
    async execute(client, arg, M) {
        if (!arg.length) return await M.reply('❌ Please provide an Instagram URL');

        const url = arg;
        console.log(url);

        if (
            !(
                url.includes('instagram.com/p/') ||
                url.includes('instagram.com/reel/') ||
                url.includes('instagram.com/tv/')
            )
        )
            return await M.reply('❌ Wrong URL! Only Instagram posted videos, TV, and reels can be downloaded');

        try {
            const response = await axios.get(`https://weeb-api.vercel.app/insta?url=${url}`);
            const { urls } = response.data;

            if (urls.length === 0) {
                return await M.reply('❌ No video found in the provided URL.');
            }

            const { url: videoUrl, type } = urls[0]; // Access the first URL directly
            const buffer = await client.utils.getBuffer(videoUrl);
            await client.sendMessage(
                M.from,
                {
                    video: buffer,
                    caption: type,
                    gifPlayback: true
                },
                {
                    quoted: M
                }
            );
        } catch (error) {
            console.error('Error fetching and sending Instagram video:', error);
            await M.reply('❌ Error while fetching or sending the video.');
        }
    }
};
