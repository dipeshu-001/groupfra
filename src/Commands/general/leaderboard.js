const { getStats } = require('../../lib/stats');
const sortArray = require('sort-array');
const {Deck , Coll} = require("../../Database")
module.exports = {
    name: 'leaderboard',
    aliases: ['lb'],
    category: 'general',
    exp: 5,
    cool: 30,
    react: "✅",
    description: "Displays the global or group leaderboard of a specific field\nEx: lb gold gc",
    async execute(client, arg, M) {
        const group = ['gc', 'group'];
        const economy = ['gold', 'economy'];
        const term = arg.split(' ');
        const groupMetadata = await client.groupMetadata(M.from);
        const groupMembers = groupMetadata?.participants.map((x) => x.id.split('.whatsapp.net')[0]) || [];
        const users = !economy.includes(term[0])
          ? Object.values(await client.exp.all()).map((x) => ({ user: x.id, xp: x.value.whatsapp.net })) || []
          : Object.values(await client.econ.find().sort({ wallet: -1 }).limit(10)).map((x) => ({
              user: x.userId,
              wallet: x.wallet,
              bank: x.bank
            }));
        
        const sortUsers = !economy.includes(term[0])
          ? sortArray(users, {
              by: 'xp',
              order: 'desc'
            })
          : sortArray(users, {
              by: 'total',
              order: 'desc',
              computed: {
                total: (cradit) => cradit.wallet + cradit.bank
              }
            });
        
        const leaderboard = group.includes(term[1] || arg)
          ? sortUsers.filter((x) => groupMembers.includes(x.user))
          : sortUsers;
        
        if (leaderboard.length < 10) return M.reply('Sorry, there are not enough users to create a leaderboard.');

        let text = `☆☆💥 LEADERBOARD 💥☆☆\n\n`

if (term[0] === 'economy') {
  let userPosition = -1; // Default position if user is not found
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    if (user.user === M.sender) {
      userPosition = i + 1;
      break;
    }
  }
  text += `*${
    (await client.contact.getContact(M.sender, client)).username
  }'s Position is ${userPosition}*`;
}else{
  const myPosition = leaderboard.findIndex((x) => x.user == M.sender.split('.whatsapp.net')[0])
   text += `*${
      (await client.contact.getContact(M.sender, client)).username
  }'s Position is ${myPosition + 1}*`
}


        for (let i = 0; i < 10; i++) {
          const level = (await client.DB.get(`${leaderboard[i].user}.whatsapp.net_LEVEL`)) || 1;
          const { requiredXpToLevelUp, rank } = getStats(level);
          const userContact = await client.contact.getContact(leaderboard[i].user, client);
          const userExp = await client.exp.get(leaderboard[i].user)
          const username = economy.includes(term[0]) ? userContact.username : userContact.username.whatsapp.net;
          const experience = economy.includes(term[0]) ? userExp : userExp.whatsapp.net || 0;
          text += `\n\n*>${i + 1}*\n`;
          text += `🏮 *Username: ${username}*#${leaderboard[i].user.substring(3, 7)}\n〽️ *Level: ${level}*\n⭐ *Exp: ${experience}*\n💫 *Rank: ${rank}* ${
            economy.includes(term[0]) ? `\n💰 *Cradit: ${leaderboard[i].wallet + leaderboard[i].bank}*` : ''
          }`;
        }
        
        client.sendMessage(
          M.from,
          {
            video: {
              url: 'https://telegra.ph/file/8d566ae94b1c16dab47c1.mp4'
            },
            caption: text,
            gifPlayback: true
          },
          {
            quoted: M
          }
        );
    }
}



/*const term = arg.split(' ');

        if(term === 'economy'){
            const users = await client.econ.find().sort({ wallet: -1 }).limit(10);

if (users.length === 0) {
  return M.reply('No users found in the leaderboard.');
}

let userPosition = -1; // Default position if user is not found
for (let i = 0; i < users.length; i++) {
  const user = users[i];
  if (user.userId === M.sender) {
    userPosition = i + 1;
    break;
  }
}

if (userPosition === -1) {
  return M.reply('User not found in the leaderboard.');
}

let text = `💰 Economy Leaderboard 💰\n\nYour position: ${userPosition}\n\n`;
for (let i = 0; i < users.length; i++) {
  const user = users[i];

  // Retrieve card lengths for the current user
  const userColl = await Coll.findOne({ userId: user.userId });
  const userDeck = await Deck.findOne({ userId: user.userId });
  const cardLength = userColl ? userColl.coll.length : 0;
  const deckLength = userDeck ? userDeck.deck.length : 0;

  text += `>${i + 1}. *${(await client.contact.getContact(user.userId, client)).username}*#${user.userId.substring(3, 7)}\n`;
  text += `💰 Money: ${user.wallet + user.bank}\n`;
  text += `💎 Tokens: ${user.tokens}\n`;
  text += `🃏 Card Length: ${cardLength + deckLength}\n`; // Include card lengths
}
        client.sendMessage(M.from,
            {
                video: {
                    url: 'https://telegra.ph/file/8d566ae94b1c16dab47c1.mp4'
                },
                caption: text,
                gifPlayback: true
            },
            {
                quoted: M
            }
        )
        }else{*/