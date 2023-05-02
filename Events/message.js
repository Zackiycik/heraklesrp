const Discord = require("discord.js");
const { client } = require("../index.js");
const config = require("../Json/config.json");

client.on("messageCreate", async message  =>{
    if (message.author.bot) return;
    if (!message.content.startsWith(config.Prefix)) return;
    let command = message.content.split(" ")[0].slice(config.Prefix.length);
    let params = message.content.split(" ").slice(1);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if(cmd.conf.enabled == false) return;
        cmd.run(client, message, params);
    }
})