const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("seyahat")
        .setDescription("İstenilen bölgeye 1000HŁ karşılığında götürür.")
        .setDMPermission(false)
        .addStringOption(z => z.setName("bölge").setDescription("Gitmek istediğiniz bölgeyi seçiniz.").setRequired(true).addChoices( { name: 'Sicilya', value: 'sicilya' },{ name: 'Roma', value: 'roma' } ))
        , 
    run: async (client, interaction) => {
        let bölge = interaction.options.getString("bölge");
        let cuzdan = db.fetch(`cuzdan.${interaction.user.id}`) ? db.fetch(`cuzdan.${interaction.user.id}`) : 0;
        if (bölge === "roma") {
            if (interaction.member.roles.cache.has("1006316498148655276")) return interaction.reply({content: "Şuanki bulunduğun bölgeye yolculuk edemezsin."})
            if (parseInt(cuzdan) < 1000) return interaction.reply({content: "Yolculuk yapacak o kadar paran bulunmamakta."})
            interaction.member.roles.add("1006316498148655276")
            interaction.member.roles.remove("1003018308813062174")
            db.subtract(`cuzdan.${interaction.user.id}`, 1000)
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setDescription(`${interaction.user} adlı kullanıcı **Roma** bölgesine doğru yolculuk yaptı.`)
            interaction.reply({embeds: [emb]})    
        } else if (bölge === "sicilya") {
            if (interaction.member.roles.cache.has("1003018308813062174")) return interaction.reply({content: "Şuanki bulunduğun bölgeye yolculuk edemezsin."})
            if (parseInt(cuzdan) < 1000) return interaction.reply({content: "Yolculuk yapacak o kadar paran bulunmamakta."})
            interaction.member.roles.add("1003018308813062174")
            interaction.member.roles.remove("1006316498148655276")
            db.subtract(`cuzdan.${interaction.user.id}`, 1000)
            const emb = new Discord.EmbedBuilder()
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
            .setColor("00ff00")
            .setDescription(`${interaction.user} adlı kullanıcı **Sicilya** bölgesine doğru yolculuk yaptı.`)
            interaction.reply({embeds: [emb]})  
        } else return interaction.reply({content: "Bir hata var looo"})
    }
}