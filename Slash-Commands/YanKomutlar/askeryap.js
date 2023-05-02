const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("silahlandır")
        .setDescription("Etiketlenen kullanıcıyı tutuklamanızı sağlar.")
        .setDMPermission(false)
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.ManageRoles)
        .addUserOption(z => z.setName("etiket").setDescription("Tutuklamak istediğiniz kişiyi etiketleyin.").setRequired(true))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket");
        interaction.guild.members.cache.get(user.id).roles.add("1011000792574078986")
        interaction.guild.members.cache.get(user.id).roles.add("1011285595303202877")
        let silah = marketVeri.market["glock-19"]
        let ruhsat = marketVeri.market.ruhsat
        let mermi = marketVeri.market.mermi
        db.push(`envanter.${interaction.user.id}`, {isim: silah.isim , rolID: silah.rolID, adet: 1, kategori: silah.kategori})
        db.push(`envanter.${interaction.user.id}`, {isim: ruhsat.isim , rolID: ruhsat.rolID, adet: 1, kategori: ruhsat.kategori})
        db.push(`envanter.${interaction.user.id}`, {isim: mermi.isim , adet: 1, kategori: mermi.kategori})
        interaction.reply({content: "Eşyalar başarı ile verildi."})
    }
}