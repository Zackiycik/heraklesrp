const Discord = require("discord.js")
const config = require("../../Json/config.json")
const marketVeri = require("../../Json/market.json")
const db = require("fera.db")
module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("market")
        .setDescription("Sunucumuzda bulunan eşyaların fiyatlarını gösterir.")
        .setDMPermission(false)
        .addStringOption(options => 
            options
            .setName("kategori")
            .setDescription("Marketteki kategorileri seçiniz.")
            .setRequired(true)
            .addChoices(
                { name: 'Araba', value: 'araba' },
                { name: 'Ev', value: 'ev' },
                { name: 'Motor', value: 'motor' },
                { name: 'Telefon', value: 'telefon' },
                { name: 'Ürünler', value: 'ürünler' },
                { name: 'Silah', value: 'silah' },
                { name: 'İllegal', value: 'illegal' },
                { name: 'Gemi', value: 'gemi' }
            ))
        , 
    run: async (client, interaction) => {
        let kategori = interaction.options.getString("kategori")
        let kateler = ["araba","ev","motor","telefon","ürünler","silah","illegal","gemi"];
        if(kateler.includes(kategori)){
            msg = "";
            kateler.filter(a => a == kategori).forEach(z =>{
                let veri = Object.keys(marketVeri.market).filter(zz => marketVeri.market[zz].kategori == kategori);
                veri.forEach(zzz =>{
                    msg += `${marketVeri.market[zzz].isim}: **\`${marketVeri.market[zzz].fiyat.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".")}HŁ\`**\n`;
                });
            });
        }
        let katep
        if (kategori === "araba") katep = "Araba"
        if (kategori === "ev") katep = "Ev"
        if (kategori === "motor") katep = "Motor"
        if (kategori === "telefon") katep = "Telefon"
        if (kategori === "ürünler") katep = "Ürünler"
        if (kategori === "silah") {
            katep = "Silah"
            msg += `${marketVeri.market.mermi.isim}: **\`${marketVeri.market.mermi.fiyat.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".")}HŁ\`**`
        }
        if (kategori === "illegal") {
            katep = "Silah"
            msg += `${marketVeri.market.mermi.isim}: **\`${marketVeri.market.mermi.fiyat.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1'+".")}HŁ\`**`
        }
        if (kategori === "gemi") katep = "Gemi"
        const emb = new Discord.EmbedBuilder()
        .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
        .setFooter({ text: `${config.Footer}`, iconURL: `${interaction.user.avatarURL({dynamic: true}) ? interaction.user.avatarURL({dynamic: true}) : client.user.avatarURL({dynamic: true})}`})
        .setThumbnail(`${client.user.avatarURL({dynamic: true})}`)
        .setColor("00ff00")
        .setTitle(`${katep} Kategorisi:`)
        .setDescription(`${msg}`)
        interaction.reply({embeds: [emb]})
    }
}