const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("mülklerim")
        .setDescription("Kullanıcının mülklerini gösterir.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Mülklerine bakmak istediğin kişiyi etiketle."))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket") || interaction.user;
        let inv = db.get(`envanter.${user.id}`) || [];
        if(inv.length == 0) return interaction.reply({content: "Mülklerin boş gibi duruyor `/satınal` komutu ile bir şeyler satın alabilirsin."})
        
        let liste = "";
        inv.forEach((item) => {
            if(item.kategori == "telefon" || item.kategori == "ürünler" || item.kategori == "mermi" || item.kategori == "silah" || item.kategori == "illegal") return;
            liste += `**${item.isim}:** \`${item.adet}\`\n`;
        });
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setDescription(`**${user} Adlı Kullanıcının Mülkleri:**\n\n${liste}`)
        interaction.reply({embeds: [emb]})
    }
}