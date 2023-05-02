const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("iyileştir")
        .setDescription("Etiketlenen kullanıcıyu iyileştirmenizi sağlar.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("İyileştirmek istediğiniz kişiyi etiketleyin.").setRequired(true))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        if (!interaction.member.roles.cache.has("1010976603733495838") && !interaction.member.roles.cache.has("1011014983624163329")) return interaction.reply({content: "Bu komutu kullanabilmek için <@&1011014983624163329> veya <@&1010976603733495838> mesleklerine sahip olmalısın."})
        let durum = db.fetch(`sağlık.${user.id}`) ? db.fetch(`sağlık.${user.id}`) : 0;
        db.set(`sağlık.${user.id}`, 100)
        db.subtract(`cuzdan.${user.id}`, 1000)
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setDescription(`${interaction.user} adlı kullanıcı ${user} adlı kullanıcıyı tedavi etti.\n\n**Tedavi Bilgileri:**\`\`\`Tedavi Edilmeden Önceki Sağlık: ${durum}\nTedavi Edilmdikten Sonraki Sağlık: 100\`\`\``)
        interaction.reply({embeds: [emb]})
    }
}