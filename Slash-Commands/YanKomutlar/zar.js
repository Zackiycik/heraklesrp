const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("zar")
        .setDescription("Zar atmanı sağlar.")
        .setDMPermission(false)
        , 
    run: async (client, interaction) => {
        let sayı = [1,2,3,4,5,6]
        let sonuc = sayı[Math.floor(Math.random() * 6)]
        let emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
            .setColor("00ff00")
            .setTitle("Gelen Zar:")
            .setDescription(`**🎲 ${sonuc}**`)
        interaction.reply({embeds: [emb]})
    }
}