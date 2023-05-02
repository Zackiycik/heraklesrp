const Discord = require("discord.js");
const { client, scommands } = require("../index.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require("../Json/config.json");

client.on("ready", async () => {
    console.log(`${client.user.tag} bot aktif edildi.`);
    client.user.setPresence({ activities: [{ name: 'Kodlanıyor...' }] });
});