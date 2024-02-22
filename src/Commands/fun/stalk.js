module.exports = {
    name: 'stalk',
    category: 'fun',
    exp: 5,
    cool: 15,
    react: '✅',
    description: 'Stalk People! ♥',
    async execute(client, arg, M) {
      if (!arg) {
        return M.reply(`Use command like: ${prefix}stalk 923087880xxx`);
      }
  
      const inputNumber = arg;
      if (!inputNumber.includes('x')) {
        return M.reply('You did not add "x"');
      }
  
      if (inputNumber.includes('xxxx')) {
        return M.reply('Maximum 3 "x" are allowed! To avoid ban!');
      }
  
      M.reply('🔍 Searching for WhatsApp accounts in the given range...\n\n⏳ Please wait for a minute...');
  
      function countInstances(string, word) {
        return string.split(word).length - 1;
      }
  
      const number0 = inputNumber.split('x')[0];
      const number1 = inputNumber.split('x').slice(-1)[0];
      const randomLength = countInstances(inputNumber, 'x');
  
      let randomxx = 0;
      if (randomLength >= 1 && randomLength <= 4) {
        randomxx = 10 ** randomLength;
      }
  
      let nomerny = '        *List of WhatsApp Numbers* 📞\n\n';
      let nobio = `\n🌟 *Bio:* Hey there! I am using WhatsApp.\n\n`;
      let nowhatsapp = `\n🌟 *Numbers with No WhatsApp Account* ❌\n\n`;
  
      for (let i = 0; i < randomxx; i++) {
        const nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const rndm = nu.slice(0, randomLength).map(() => nu[Math.floor(Math.random() * nu.length)]).join('');
        const jid = `${number0}${rndm}${number1}@s.whatsapp.net`;
  
        try {
          const anu = await client.onWhatsApp(jid);
          if (anu.length === 0) {
            nowhatsapp += `${jid}\n`;
          } else {
            try {
              const anu1 = await client.fetchStatus(anu[0].jid);
              nomerny += `🎀 *Number:* wa.me/${anu[0].jid.split('@')[0]}\n🔹 *Bio :* ${anu1.status}\n\n`;
            } catch {
              nobio += `wa.me/${anu[0].jid.split('@')[0]}\n`;
            }
          }
        } catch {
          nowhatsapp += `${jid}\n`;
        }
      }
  
      await client.sendMessage(M.from, { text: `${nomerny} ${nobio} ${nowhatsapp}` }, { quoted: M });
    },
  };
  