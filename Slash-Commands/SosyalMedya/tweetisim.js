const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("twiterisim")
        .setDescription("Twiter hesabınızın adını belirler.")
        .setDMPermission(false)
        .addStringOption(z => z.setName("isim").setDescription("Twiter hesabınızın kullanıcı adı.").setRequired(true))
        , 
    run: async (client, interaction) => {
        let isim = interaction.options.getString("isim");
        let karakter = [" ",",","*","/",":",";","-","+","!", "$"];
        let err = false;
        karakter.forEach(a => isim.includes(a) ? err = true : null);
        if(err == true) return interaction.reply({content: "`.` hariç diğer karakterleri kullanamazsın veya boşluk kullanamazsın."})
        db.set(`twiterisim.${interaction.user.id}`, isim.toLowerCase())
        interaction.reply({content: "Kullanıcı ismin başarıyla onaylandı."})
    }
}