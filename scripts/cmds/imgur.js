const axios = require('axios');

module.exports = {
  config: {
    name: "imgur",
    version: "1.0",
    author: "kaizenji",
    countDown: 5,
    role: 0,
    longDescription: { en: "Upload Mp4, Gif, Jpeg in Imgur"},
    category: "image",
    guide: {
      en: "{pn} reply to image"
    }
  },

  onStart: async function ({ message, api, event }) {
    const pogi = event.messageReply?.attachments[0]?.url;

    if (!pogi) {
      return message.reply('Please reply to an image.');
    }

    try {
      const res = await axios.get(`https://kaizenji-rest-api.onrender.com/imgur?link=${encodeURIComponent(pogi)}`);
      const kaiz = res.data.uploaded.image;
      return message.reply(kaiz);
    } catch (error) {
      console.error(error);
      return message.reply('api sucks bro.');
    }
  }
};
