const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kayıt")
        .setDescription("Etiketlenen kullanıcıyı katıt etmeni sağlar")
        .setDMPermission(false)
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageNicknames)
        .addUserOption(z => z.setName("etiket").setDescription("Kayıt etmek istediğiniz kişiyi etiketleyin.").setRequired(true))
        .addStringOption(z => z.setName("isim").setDescription("Kayıt etmek istediğiniz kişinin adını giriniz.").setRequired(true))
        .addStringOption(z => z.setName("bölge").setDescription("Başlangıç bölgesini seçiniz.").setRequired(true).addChoices( { name: 'Sicilya', value: 'sicilya' },{ name: 'Roma', value: 'roma' } ))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        let isim = interaction.options.getString("isim");
        let bölge = interaction.options.getString("bölge");
        if (isim.lenght > 30) return interaction.reply({content: "Kullanıcı isimini 30 karakterden kısa tutmalısın."})
        interaction.guild.members.cache.get(user.id).setNickname(`${isim}`)
        if (bölge === "sicilya") interaction.guild.members.cache.get(user.id).roles.add("1003018308813062174")
        if (bölge === "roma") interaction.guild.members.cache.get(user.id).roles.add("1006316498148655276")
        interaction.guild.members.cache.get(user.id).roles.add("997993912188809287")
        interaction.guild.members.cache.get(user.id).roles.remove("997993907608629248")
        let emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setTitle("__KAYIT BAŞARILI__")
            .setDescription(`**${user} adlı kullanıcı \`${isim}\` adıyla kaydoldu.\nKaydeden Yetkili: ${interaction.user}**`)
        interaction.reply({embeds: [emb]})
    }
}