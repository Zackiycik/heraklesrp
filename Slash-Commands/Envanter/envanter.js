const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("envanter")
        .setDescription("Kullanıcının envanterindeki eşyaları gösterir.")
        .setDMPermission(false)
        .addUserOption(z => z.setName("etiket").setDescription("Envanterine bakmak istediğin kişiyi etiketle."))
        , 
    run: async (client, interaction) => {
        let user = interaction.options.getUser("etiket") || interaction.user;
        let inv = db.get(`envanter.${user.id}`) || [];
        if(inv.length == 0) return interaction.reply({content: "Envanterin boş gibi duruyor `/satınal` komutu ile bir şeyler satın alabilirsin."})
        
        let liste = "";
        inv.forEach((item) => {
            if(item.adet <= 0) {
                let items = db.fetch(`envanter.${user.id}`) ? db.fetch(`envanter.${user.id}`) : []
                function remove(arr, value) {
                    arr.splice(value, 1);
                    return arr;
                }
                remove(items, items.findIndex(x => x.isim == item.isim))
                db.set(`envanter.${user.id}`,items)
            }
        });
        let env = db.get(`envanter.${user.id}`) || [];
        env.forEach((item) => {
            if(item.kategori == "motor" || item.kategori == "ev" || item.kategori == "araba" || item.kategori == "gemi") return;
            liste += `**${item.isim}:** \`${item.adet}\`\n`;
        });
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setDescription(`**${user} Adlı Kullanıcının Envanteri:**\n\n${liste}`)
        interaction.reply({embeds: [emb]})
    }
}