const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("yeni")
        .setDescription("Sunucuya yeni katılan insanların başlangıç paralarını almasını sağlayan komuttur.")
        .setDMPermission(false)
        , 
    run: async (client, interaction) => {
        let yeniDurum = db.fetch(`yeni.${interaction.user.id}`)
        if (yeniDurum === true) return interaction.reply({content: "Yeni kullanıcılar için olan parayı almışsın."})
        db.set(`banka.${interaction.user.id}`, 5000)
        db.set(`yeni.${interaction.user.id}`, true)
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setTitle(`Yeni Gelen Bakiyesi Verildi!`)
        .setDescription(`Yeni komutunu kullanan ${interaction.user} kullanıcısına **\`5000HŁ\`** miktar para verildi.`)
        interaction.reply({embeds: [emb]})
    }
}