const fs = require("fs-extra");

const { utils } = global;



module.exports = {

  config: {

    name: "prefix",

    version: "1.3",

    author: "NTKhang",

    countDown: 5,

    role: 0,

    shortDescription: "Thay đổi prefix của bot",

    longDescription: "Thay đổi dấu lệnh của bot trong box chat của bạn hoặc cả hệ thống bot (chỉ admin bot)",

    category: "config",

    guide: {

      vi: "   {pn} <new prefix>: thay đổi prefix mới trong box chat của bạn"

        + "\n   Ví dụ:"

        + "\n    {pn} #"

        + "\n\n   {pn} <new prefix> -g: thay đổi prefix mới trong hệ thống bot (chỉ admin bot)"

        + "\n   Ví dụ:"

        + "\n    {pn} # -g"

        + "\n\n   {pn} reset: thay đổi prefix trong box chat của bạn về mặc định",

      en: "   {pn} <new prefix>: change new prefix in your box chat"

        + "\n   Example:"

        + "\n    {pn} #"

        + "\n\n   {pn} <new prefix> -g: change new prefix in system bot (only admin bot)"

        + "\n   Example:"

        + "\n    {pn} # -g"

        + "\n\n   {pn} reset: change prefix in your box chat to default"

    }

  },



  langs: {

    vi: {

      reset: "Đã reset prefix của bạn về mặc định: %1",

      onlyAdmin: "Chỉ admin mới có thể thay đổi prefix hệ thống bot",

      confirmGlobal: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix của toàn bộ hệ thống bot",

      confirmThisThread: "Vui lòng thả cảm xúc bất kỳ vào tin nhắn này để xác nhận thay đổi prefix trong nhóm chat của bạn",

      successGlobal: "Đã thay đổi prefix hệ thống bot thành: %1",

      successThisThread: "Đã thay đổi prefix trong nhóm chat của bạn thành: %1",

      myPrefix: "🌐 Prefix của hệ thống: %1\n🛸 Prefix của nhóm bạn: %2"

    },

    en: {

      reset: "𝗬𝗼𝘂𝗿 𝗽𝗿𝗲𝗳𝗶𝘅 𝗵𝗮𝘀 𝗯𝗲𝗲𝗻 𝗿𝗲𝘀𝗲𝘁 𝘁𝗼 𝗱𝗲𝗳𝗮𝘂𝗹𝘁: %1",

      onlyAdmin: "𝗢𝗻𝗹𝘆 𝗮𝗱𝗺𝗶𝗻 𝗰𝗮𝗻 𝗰𝗵𝗮𝗻𝗴𝗲 𝗽𝗿𝗲𝗳𝗶𝘅 𝗼𝗳 𝘀𝘆𝘀𝘁𝗲𝗺 𝗯𝗼𝘁",

      confirmGlobal: "𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗮𝗰𝘁 𝘁𝗼 𝘁𝗵𝗶𝘀 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝘁𝗼 𝗰𝗼𝗻𝗳𝗶𝗿𝗺 𝗰𝗵𝗮𝗻𝗴𝗲 𝗽𝗿𝗲𝗳𝗶𝘅 𝗼𝗳 𝘀𝘆𝘀𝘁𝗲𝗺 𝗯𝗼𝘁",

      confirmThisThread: "𝗣𝗹𝗲𝗮𝘀𝗲 𝗿𝗲𝗮𝗰𝘁 𝘁𝗼 𝘁𝗵𝗶𝘀 𝗺𝗲𝘀𝘀𝗮𝗴𝗲 𝘁𝗼 𝗰𝗼𝗻𝗳𝗶𝗿𝗺 𝗰𝗵𝗮𝗻𝗴𝗲 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝗻 𝘆𝗼𝘂𝗿 𝗯𝗼𝘅 𝗰𝗵𝗮𝘁",

      successGlobal: "𝗖𝗵𝗮𝗻𝗴𝗲𝗱 𝗽𝗿𝗲𝗳𝗶𝘅 𝗼𝗳 𝘀𝘆𝘀𝘁𝗲𝗺 𝗯𝗼𝘁 𝘁𝗼: %1",

      successThisThread: "𝗖𝗵𝗮𝗻𝗴𝗲𝗱 𝗽𝗿𝗲𝗳𝗶𝘅 𝗶𝗻 𝘆𝗼𝘂𝗿 𝗯𝗼𝘅 𝗰𝗵𝗮𝘁 𝘁𝗼: %1",

      myPrefix: "\n\n🟢\x20\x20\x20\x20[✰-𝗣𝗥𝗘𝗙𝗜𝗫⊰⊱❊]\x20\x20\x20\x20🟢\n\n┏━━ [ 義 𝗚𝗶𝘆𝘂 | 🌊 勇 ]━━➣\n┃ ➩ 𝗦𝘆𝘀𝘁𝗲𝗺 𝗽𝗿𝗲𝗳𝗶𝘅: [ %1 ]\n┃➩ 𝗬𝗼𝘂𝗿 𝗯𝗼𝘅 𝗰𝗵𝗮𝘁 𝗽𝗿𝗲𝗳𝗶𝘅: [ %2 ]\n┗━━━━━━━━━━━━➢"

    }

  },



  onStart: async function ({ message, role, args, commandName, event, threadsData, getLang }) {

    if (!args[0])

      return message.SyntaxError();



    if (args[0] == 'reset') {

      await threadsData.set(event.threadID, null, "data.prefix");

      return message.reply(getLang("reset", global.GoatBot.config.prefix));

    }



    const newPrefix = args[0];

    const formSet = {

      commandName,

      author: event.senderID,

      newPrefix

    };



    if (args[1] === "-g")

      if (role < 2)

        return message.reply(getLang("onlyAdmin"));

      else

        formSet.setGlobal = true;

    else

      formSet.setGlobal = false;



    return message.reply(args[1] === "-g" ? getLang("confirmGlobal") : getLang("confirmThisThread"), (err, info) => {

      formSet.messageID = info.messageID;

      global.GoatBot.onReaction.set(info.messageID, formSet);

    });

  },



  onReaction: async function ({ message, threadsData, event, Reaction, getLang }) {

    const { author, newPrefix, setGlobal } = Reaction;

    if (event.userID !== author)

      return;

    if (setGlobal) {

      global.GoatBot.config.prefix = newPrefix;

      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));

      return message.reply(getLang("successGlobal", newPrefix));

    }

    else {

      await threadsData.set(event.threadID, newPrefix, "data.prefix");

      return message.reply(getLang("successThisThread", newPrefix));

    }

  },



  onChat: async function ({ event, message, usersData, getLang }) {

    const data = await usersData.get(event.senderID);

    const name = data.name;

    const xyrene = {

      body: `𒅒\x20\x20\x20\x20\x20\x20\x20${name}\x20\x20\x20\x20\x20\x20\x20𒅒` + getLang("myPrefix", global.GoatBot.config.prefix, utils.getPrefix(event.threadID)),

      attachment: await global.utils.getStreamFromURL("https://i.imgur.com/AXIMfSE.gif")

        };

    if (event.body && event.body.toLowerCase() === "prefix")

      return () => {

        return message.reply(xyrene);

      };

  }

};
