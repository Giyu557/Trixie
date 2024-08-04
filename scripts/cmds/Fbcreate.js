const fs = require("fs");
const axios = require("axios");
const crypto = require("crypto");

module.exports.config = {
    name: "fbcreate",
    version: "1.0.0",
    role: 0,
    credits: "Developer",
    description: "Create Facebook accounts using randomly generated email addresses.",
    usage: "{pn} fbcreate <amount>",
    hasPrefix: true,
    commandCategory: "Utilities",
    cooldown: 0,
};

module.exports.run = async function({ api, event, args }) {
    try {
        const threadID = event.threadID;
        const senderID = event.senderID;
        const amount = parseInt(args[0], 10);

        if (isNaN(amount) || amount <= 0) {
            return api.sendMessage("❌ Invalid number of accounts requested. Please specify a positive integer.", threadID);
        }

        api.sendMessage(`🚀 Creating ${amount} Facebook account(s)... Please wait.`, threadID);

        const accounts = [];
        for (let i = 0; i < amount; i++) {
            const account = await createMailTmAccount();
            if (account) {
                const regData = await registerFacebookAccount(account.email, account.password, account.firstName, account.lastName, account.birthday);
                if (regData) {
                    accounts.push({
                        email: account.email,
                        password: account.password,
                        firstName: account.firstName,
                        lastName: account.lastName,
                        birthday: account.birthday.toISOString().split('T')[0],
                        gender: regData.gender,
                        userId: regData.new_user_id,
                        token: regData.session_info.access_token,
                    });
                } else {
                    api.sendMessage(`⚠️ Failed to register account: ${account.email}`, threadID);
                }
            } else {
                api.sendMessage(`⚠️ Failed to create email for account ${i + 1}.`, threadID);
            }
        }

        if (accounts.length > 0) {
            let resultMessage = `🎉 Accounts created successfully:\n`;
            accounts.forEach((acc, index) => {
                resultMessage += `\n${index + 1}: ${acc.firstName} ${acc.lastName} - ${acc.email} (Password: ${acc.password})`;
            });
            api.sendMessage(resultMessage, threadID);
        } else {
            api.sendMessage("❌ No accounts were created successfully.", threadID);
        }
    } catch (error) {
        console.error(error);
        return api
      
