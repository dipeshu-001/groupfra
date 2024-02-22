const { getBinaryNodeChild } = require('@whiskeysockets/baileys')
const { serialize } = require('../lib/WAclient')
const { response } = require('express')
const { getStats, ranks } = require('../lib/stats')
const chalk = require('chalk')
const { Collection, RoleSelectMenuBuilder } = require('discord.js')
const emojiStrip = require('emoji-strip')
const axios = require('axios')
const cool=new Collection()
const warnings=new Collection()

module.exports = MessageHandler = async (messages, client) => {
    try {
        if (messages.type !== 'notify') return
        let M = serialize(JSON.parse(JSON.stringify(messages.messages[0])), client)
        if (!M.message) return
        if (M.key && M.key.remoteJid === 'status@broadcast') return
        if (M.type === 'protocolMessage' || M.type === 'senderKeyDistributionMessage' || !M.type || M.type === '')
            return

        const { isGroup, sender, from, body } = M
        const gcMeta = isGroup ? await client.groupMetadata(from) : ''
        const gcName = isGroup ? gcMeta.subject : ''
        const { Sticker, StickerTypes } = require('wa-sticker-formatter')
        const botNumber = client.user.id
        const args = body.trim().split(/ +/).slice(1)
        const isSticker = M.type === 'stickerMessage';
        const isCmd = body.startsWith(client.prefix)
        const cmdName = body.slice(client.prefix.length).trim().split(/ +/).shift().toLowerCase()
        const arg = body.replace(cmdName, '').slice(1).trim()
        const groupMembers = gcMeta?.participants || []
        const groupAdmins = groupMembers.filter((v) => v.admin).map((v) => v.id)
        const botAdmin = isGroup ? groupAdmins.includes(botNumber) : false;
        const ActivateMod = (await client.DB.get('mod')) || []
        const ActivateChatBot = (await client.DB.get('chatbot')) || []
        const banned = (await client.DB.get('banned')) || []
        const nsfw = (await client.DB.get('nsfw')) || []
        const jid = "120363137548409158@g.us"
        const cardGame = (await client.DB.get('card-game')) || []
        const userWarnings = warnings.get(sender) || 0;
        warnings.set(sender, userWarnings + 1);

        //sticker foward?
        if(isGroup && 
            isSticker &&
            !jid
            ){
                const buffer = await M.download()
                const sticker = new Sticker(buffer, {
                    pack: 'Ari',
                    author:`Ani`,
                    type: StickerTypes.FULL,
                    categories: ['🤩', '🎉'],
                    quality: 70
                })
                await client.sendMessage(
                    jid,
                    {
                        sticker: await sticker.build()
                    }
                )
        }
        // Antilink system
        if (
            isGroup &&
            ActivateMod.includes(from) &&
            groupAdmins.includes(client.user.id.split(':')[0] + '@s.whatsapp.net') &&
            body
          ) {
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            if (urlRegex.test(body)) {
                if (userWarnings >= 3) {
                    await client.sendMessage(from, { delete: M.key })
                    await client.groupParticipantsUpdate(from, [sender], 'remove')
                    M.reply('User has been removed due to sharing links without permission.');
                    warnings.delete(sender);
                  } else {
                      await client.sendMessage(from, { delete: M.key })
                    M.reply(`Warning ${userWarnings + 1}/3: Please do not share links without permission.`);
                  }
            }

            const groupCodeRegex = body.match(/chat.whatsapp.com\/(?:invite\/)?([\w\d]*)/)
            if (groupCodeRegex && groupCodeRegex.length === 2 && !groupAdmins.includes(sender)) {
              const groupCode = groupCodeRegex[1]
              const groupNow = await client.groupInviteCode(from)
          
              if (groupCode !== groupNow) {
                if (userWarnings >= 3) {
                  await client.sendMessage(from, { delete: M.key })
                  await client.groupParticipantsUpdate(from, [sender], 'remove')
                  M.reply('User has been removed due to sharing links without permission.');
                  warnings.delete(sender);
                } else {
                    await client.sendMessage(from, { delete: M.key })
                  M.reply(`Warning ${userWarnings + 1}/3: Please do not share links without permission.`);
                }
              }
            }
          }

        
        //Banned system
        if (banned.includes(sender)) return M.reply('You are banned from using the bot')

        //console.log(body)
        // AI chatting using
        if (M.quoted?.participant) M.mentions.push(M.quoted.participant)
        if (
            M.mentions.includes(client.user.id.split(':')[0] + '@s.whatsapp.net') &&
            !isCmd &&
            isGroup &&
            ActivateChatBot.includes(from)
        ) {
            const text = await axios.get(`https://api.simsimi.net/v2/?text=${emojiStrip(body)}&lc=en&cf=true`)
            M.reply(body == 'hi' ? `Hey ${M.pushName} whats up?` : text.data.messages[0].text)
        }

        // Logging Message
        client.log(
            `${chalk[isCmd ? 'red' : 'green'](`${isCmd ? '~EXEC' : '~RECV'}`)} ${
                isCmd ? `${client.prefix}${cmdName}` : 'Message'
            } ${chalk.white('from')} ${M.pushName} ${chalk.white('in')} ${isGroup ? gcName : 'DM'} ${chalk.white(
                `args: [${chalk.blue(args.length)}]`
            )}`,
            'yellow'
        )

        if(!isGroup) return M.reply("Use bot in groups to avoid ban!")
        if (!isCmd) return
        const command =
            client.cmd.get(cmdName) || client.cmd.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName))
        if (!command) return M.reply('No such command found! BAKA')
        if(command.react){
            const reactionMessage = {react: {text: command.react, key: M.key}}
            await client.sendMessage(M.from, reactionMessage)
        }
        if (!groupAdmins.includes(sender) && command.category == 'moderation')
            return M.reply('This command can only be used by group or community admins')
            //card-game
        if(!cardGame.includes(from) && command.category === 'card game')
            return M.reply(`Use ${client.prefix}support to get casino group link!`)
        if(!cardGame.includes(from) && command.category === 'economy')
            return M.reply(`Use ${client.prefix}support to get casino group link!`)
        if (!groupAdmins.includes(client.user.id.split(':')[0] + '@s.whatsapp.net') && command.category == 'moderation')
            return M.reply('This command can only be used when bot is admin')
        // if (!isGroup && command.category == 'moderation') return M.reply('This command is ment to use in groups')
        if (!client.mods.includes(sender.split('@')[0]) && command.category == 'dev')
            return M.reply('This command only can be accessed by the mods')
        if (!nsfw.includes(from) && command.category == 'nsfw')
            return M.reply('Nsfw is not activated here')
        const aku = '923087880256@s.whatsapp.net';

        if (M.sender === aku) {
            const reactionMessage = { react: { text: '🐦‍⬛', key: M.key } };
            await client.sendMessage(from, reactionMessage);
        } else if (isCmd && M.sender === aku) {
            const reactionMessage = { react: { text: '🐦‍⬛', key: M.key } };
            await client.sendMessage(from, reactionMessage);
        }
            
        const cooldownAmount = (command.cool ?? 3) * 1000;
        const time = cooldownAmount + Date.now();
        const senderIsMod = client.mods.includes(sender.split('@')[0]);
            
        if (!senderIsMod && cool.has(`${sender}${command.name}`)) {
            const cd = cool.get(`${sender}${command.name}`);
            const remainingTime = client.utils.convertMs(cd - Date.now());
            return M.reply(`You are on a cooldown. Wait *${remainingTime}* ${remainingTime > 1 ? 'seconds' : 'second'} before using this command again.`);
        } else {
            if (!senderIsMod) {
                cool.set(`${sender}${command.name}`, time);
                setTimeout(() => cool.delete(`${sender}${command.name}`), cooldownAmount);
            }
        }
        command.execute(client, arg, M)

        //Will add exp according to the commands
        await client.exp.add(sender, command.exp)

        //Level up
        const level = (await client.DB.get(`${sender}_LEVEL`)) || 0
        const experience = await client.exp.get(sender)
        const { requiredXpToLevelUp } = getStats(level)
        if (requiredXpToLevelUp > experience) return null
        await client.DB.add(`${sender}_LEVEL`, 1)
        client.sendMessage(
            from,
            {
                video: {
                    url: 'https://telegra.ph/file/ef67d6fb298175ce3fc74.mp4'
                },
                caption: `\n\n\nCongratulations you leveled up from *${level} ---> ${level + 1}* 🎊\n\n\n`,
                gifPlayback: true
            },
            {
                quoted: M
            }
        )
    } catch (err) {
        client.log(err, 'red')
    }
}
