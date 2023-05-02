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
            .setName("kur")
            .setDescription("Marketteki kategorileri seçiniz.")
            .setRequired(true)
            .addChoices(
                { name: 'Euro', value: 'euro' },
                { name: 'Pound', value: 'pound' },
                { name: 'Japon Yeni', value: 'yen' },
                { name: 'Çin Yuanı', value: 'yuan' },
                { name: 'Türk Lirası', value: 'lira' },
                { name: 'Rus Rublesi', value: 'ruble' },
                { name: 'ONS Altın', value: 'altın' },
                { name: 'Dolar Endeksi', value: 'endeksi' }
            )
        )
        .addStringOption(options => 
            options
            .setName("islem")
            .setDescription("Kurun alış mı satış mı fiyatı belirlenecek.")
            .setRequired(true)
            .addChoices(
                { name: 'Alış', value: 'alıs' },
                { name: 'Satış', value: 'satıs' }
            )
        )
        .addIntegerOption(z => z.setName("miktar").setDescription("Ayarlanacak kurun miktarını giriniz.").setRequired(true))
        , 
    run: async (client, interaction) => {
        
    }
}