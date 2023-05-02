const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("serbestbırak")
        .setDescription("Etiketlenen kullanıcıyı serbest bırakır sağlar.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Serbest bırakmak istediğiniz kişiyi etiketleyin.").setRequired(true))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        if (!interaction.member.roles.cache.has("1010977558914924614") && !interaction.member.roles.cache.has("1010977678435827916") && !interaction.member.roles.cache.has("1010977333307514980") && !interaction.member.roles.cache.has("1011245351233126420") && !interaction.member.roles.cache.has("1010977559065923667") && !interaction.member.roles.cache.has("1011013625206546464") && !interaction.member.roles.cache.has("1011013569325830205") && !interaction.member.roles.cache.has("1011013477185368084") && !interaction.member.roles.cache.has("1011013326261723167") && !interaction.member.roles.cache.has("1011013271094054913") && !interaction.member.roles.cache.has("1011013223568392323") && !interaction.member.roles.cache.has("1011012929782567023") && !interaction.member.roles.cache.has("1011012853307822202") && !interaction.member.roles.cache.has("1011012275445973062") && !interaction.member.roles.cache.has("1011011794447380630") && !interaction.member.roles.cache.has("1011246086037454898") && !interaction.member.roles.cache.has("1011011529249919039")) return interaction.reply({content: "Bu komutu kullanabilmek için **Polis** veya **Asker** mesleklerine sahip olmalısın."})
        if (interaction.guild.members.cache.get(user.id).roles.cache.has("1010977558914924614") && interaction.guild.members.cache.get(user.id).roles.cache.has("1010977678435827916") && interaction.guild.members.cache.get(user.id).roles.cache.has("1010977333307514980") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011245351233126420") && interaction.guild.members.cache.get(user.id).roles.cache.has("1010977559065923667") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011013625206546464") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011013569325830205") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011013477185368084") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011013326261723167") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011013271094054913") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011013223568392323") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011012929782567023") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011012853307822202") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011012275445973062") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011011794447380630") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011246086037454898") && interaction.guild.members.cache.get(user.id).roles.cache.has("1011011529249919039")) return interaction.reply({content: "Bu komutu **Polis** veya **Asker** mesleklerine sahip olan kişilerde kullanamazsın."})
        interaction.guild.members.cache.get(user.id).roles.remove("1012829833090314371")
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setDescription(`${interaction.user} adlı kullanıcı ${user} adlı kullanıcıyı serbest bıraktı.`)
        interaction.reply({embeds: [emb]})
    }
}