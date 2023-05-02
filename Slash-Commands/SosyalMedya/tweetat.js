const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const webhookClient = new Discord.WebhookClient({ url: 'https://discord.com/api/webhooks/1014630454613262427/zpPS0-86f1h-Y9MtPNzD2dbhEc0wOLpeK5NqIXsUUIHWwb6d0jPGTjKLyHkN7Uu9OXIR' });
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("tweetat")
        .setDescription("Twiter hesabınıza tweet atmanızı sağlar.")
        .setDMPermission(false)
        .addStringOption(z => z.setName("metin").setDescription("Twiter hesabınızda paylaşmak istediğiniz 280 karakterlik metin.").setRequired(true))
        , 
    run: async (client, interaction) => {
        let metin = interaction.options.getString("metin");
        if (metin.lenght > 280) return interaction.reply({content: "Yazdığın metinin karakter sayısı 280'i geçemez."})
        let veri = db.fetch(`twiterisim.${interaction.user.id}`)
        if (!veri) return interaction.reply({content: "Twitter hesabı açmalısın `!twitterisim` komutunu kullan."})
        const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `https://cdn.discordapp.com/attachments/1001581026956542023/1014629470218506290/unknown.png`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setThumbnail(`https://cdn.discordapp.com/attachments/1001581026956542023/1014629470218506290/unknown.png`)
            .setColor("1DA1F2")
            .setTitle(`${veri}`)
            .setDescription(`${metin}`)
            webhookClient.send({
                username: 'Twitter',
                avatarURL: 'https://cdn.discordapp.com/attachments/1001581026956542023/1014629470218506290/unknown.png',
                embeds: [emb],
            });
        interaction.reply({content: "Tweet başarı ile atıldı."})
    }
}