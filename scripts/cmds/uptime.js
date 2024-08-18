const os = require('os');
const { exec } = require('child_process');
const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "uptime",
    version: "1.0",
    aliases: ["upt", "up"],
    author: "kaizenji",
    role: 0,
    cooldown: 5,
    shortDescription: {
      vi: "",
      en: "Sends information about the bot and system."
    },
    longDescription: {
      vi: "",
      en: "Sends information about the bot and system."
    },
    category: "system",
    guide: {
      en: "{pn}"
    },
    envConfig: {}
  },

  onStart: async function ({ message, prefix }) {
    // Import pretty-bytes dynamically
    const { default: prettyBytes } = await import('pretty-bytes');

    // Format current date
    const now = moment();
    const date = now.format('MMMM Do YYYY');

    // Get bot uptime
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const botUptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Get system information
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const cpu = os.cpus()[0].model;
    const loadAvg = os.loadavg()[0];
    const formattedLoadAvg = (loadAvg * 100).toFixed(2) + '%';

    // Get server uptime
    exec('uptime -p', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error fetching server uptime: ${error}`);
        return;
      }

      const serverUptime = stdout.trim();

      // Get disk space usage
      exec('df -h /', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error fetching disk info: ${error}`);
          return;
        }

        const diskInfo = stdout.split('\n')[1].split(/\s+/);
        const diskUsage = diskInfo[2];
        const diskTotal = diskInfo[1];

        // Construct and send the overview message
        const systemOverview = `★ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐎𝐯𝐞𝐫𝐯𝐢𝐞𝐰 ★\n-------------------------------------\n⚙  𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:\n  𝐎𝐒: ${os.type()} ${os.release()}\n  𝐀𝐫𝐜𝐡: ${os.arch()}\n  𝐂𝐏𝐔: ${cpu}\n  𝐋𝐨𝐚𝐝 𝐀𝐯𝐠: ${formattedLoadAvg}\n-------------------------------------\n💾 𝐌𝐞𝐦𝐨𝐫𝐲 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:\n  𝐌𝐞𝐦𝐨𝐫𝐲 𝐔𝐬𝐚𝐠𝐞:\n ${prettyBytes(usedMemory)} / Total ${prettyBytes(totalMemory)}\n  𝐑𝐀𝐌 𝐔𝐬𝐚𝐠𝐞:\n ${prettyBytes(usedMemory)} / Total ${prettyBytes(totalMemory)}\n-------------------------------------\n💿 𝐃𝐢𝐬𝐤 𝐒𝐩𝐚𝐜𝐞 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:\n  𝐃𝐢𝐬𝐤 𝐒𝐩𝐚𝐜𝐞 𝐔𝐬𝐚𝐠𝐞:\n ${diskUsage} / Total ${diskTotal}\n-------------------------------------\n🤖 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞: ${botUptimeString}\n⚙ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐔𝐩𝐭𝐢𝐦𝐞: ${serverUptime}\n📊 𝐏𝐫𝐨𝐜𝐞𝐬𝐬 𝐌𝐞𝐦𝐨𝐫𝐲 𝐔𝐬𝐚𝐠𝐞:\n ${prettyBytes(process.memoryUsage().rss)}\n-------------------------------------`;

        message.reply(systemOverview);
      });
    });
  },

  onChat: async function ({ event, message }) {
    if (event.body && (event.body.toLowerCase() === "up" || event.body.toLowerCase() === "uptime")) {
      this.onStart({ message });
    }
  }
};
