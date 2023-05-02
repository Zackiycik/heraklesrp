const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("sağlık")
        .setDescription("Kullanıcının sağlık durumuna bakmanızı sağlar.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Sağlığına bakmak istediğin kişiyi etiketle."))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket") || interaction.user;
        let durum = db.fetch(`sağlık.${user.id}`) ? db.fetch(`sağlık.${user.id}`) : 0;
        let msg = "";
        if (durum <= 100 && durum > 90) {
            msg += "❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️"
        } else if (durum <= 90 && durum > 80) {
            msg += "❤️❤️❤️❤️❤️❤️❤️❤️❤️💔"
        } else if (durum <= 80 && durum > 70) {
            msg += "❤️❤️❤️❤️❤️❤️❤️❤️💔💔"
        } else if (durum <= 70 && durum > 60) {
            msg += "❤️❤️❤️❤️❤️❤️❤️💔💔💔"
        } else if (durum <= 60 && durum > 50) {
            msg += "❤️❤️❤️❤️❤️❤️💔💔💔💔"
        } else if (durum <= 50 && durum > 40) {
            msg += "❤️❤️❤️❤️❤️💔💔💔💔💔"
        } else if (durum <= 40 && durum > 30) {
            msg += "❤️❤️❤️❤️💔💔💔💔💔💔"
        } else if (durum <= 30 && durum > 20) {
            msg += "❤️❤️❤️💔💔💔💔💔💔💔"
        } else if (durum <= 20 && durum > 10) {
            msg += "❤️❤️💔💔💔💔💔💔💔💔"
        } else if (durum <= 10 && durum > 0) {
            msg += "❤️💔💔💔💔💔💔💔💔💔"
        } else if (durum === 0) {
            msg += "💔💔💔💔💔💔💔💔💔💔"
        } else return interaction.reply({content: "Hata var lo."})
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setDescription(`**${user} Adlı Kullanıcının Sağlığı:**\n\`\`\`Yüzdelik: %${durum}\nGösterge:${msg}\`\`\``)
        interaction.reply({embeds: [emb]})
    }
}